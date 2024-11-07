import { useState } from 'react'
import Header from './components/Header'
import ProjectMetadata from './components/ProjectMetadata'
import PackageManager from './components/PackageManager'
import DependencySearch from './components/DependencySearch'
import ArchitectureInfo from './components/ArchitectureInfo'

function App() {
  const [projectConfig, setProjectConfig] = useState({
    name: '',
    version: '1.0.0',
    description: '',
    author: '',
    license: 'MIT',
    private: false,
    type: 'module',
    main: 'server.js',
    keywords: [],
    repository: '',
    template: 'mvc-javascript',
    dependencies: []
  })

  const [packageManager, setPackageManager] = useState('npm')

  const templates = [
    { 
      id: 'mvc-javascript', 
      name: 'MVC JavaScript',
      description: 'Node.js MVC with JavaScript'
    },
    { 
      id: 'mvc-typescript', 
      name: 'MVC TypeScript',
      description: 'Node.js MVC with TypeScript'
    },
  ]

  const handleDependencySelect = (pkg) => {
    if (!projectConfig.dependencies.some(dep => dep.name === pkg.name)) {
      setProjectConfig(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, pkg]
      }))
    }
  }

  const removeDependency = (pkgName) => {
    setProjectConfig(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter(dep => dep.name !== pkgName)
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectConfig),
      });
  
      if (!response.ok) throw new Error("Failed to download file");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectConfig.name}.zip`;
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white p-8 overflow-x-hidden">
      <Header />

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        <ArchitectureInfo />
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <ProjectMetadata 
              projectConfig={projectConfig}
              setProjectConfig={setProjectConfig}
            />
            
            <div>
              <h3 className="text-gray-300 mb-2">Project Template</h3>
              <div className="grid grid-cols-1 gap-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    type="button"
                    className={`p-3 rounded text-left ${
                      projectConfig.template === template.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setProjectConfig(prev => ({ ...prev, template: template.id }))}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm opacity-80">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <PackageManager 
              packageManager={packageManager}
              setPackageManager={setPackageManager}
            />

            <div className="space-y-4">
              <h3 className="text-gray-300">Dependencies</h3>
              <DependencySearch
                packageManager={packageManager}
                onDependencySelect={handleDependencySelect}
              />

              <div className="space-y-2">
                {projectConfig.dependencies.map(dep => (
                  <div
                    key={dep.name}
                    className="flex items-center justify-between p-2 bg-gray-800 rounded"
                  >
                    <div>
                      <div className="font-medium">{dep.name}</div>
                      <div className="text-sm text-gray-400">{dep.version}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDependency(dep.name)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Generate Project
          </button>
        </div>
      </form>
    </div>
  )
}

export default App