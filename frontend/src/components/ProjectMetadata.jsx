import { TbBrandJavascript, TbFileImport } from 'react-icons/tb'
import { useState } from 'react'

export default function ProjectMetadata({ projectConfig, setProjectConfig }) {
  const [warning, setWarning] = useState('');
  const handleInputChange = (e) => {
    const newName = e.target.value
    
    // Check if the input matches the required format
    if (!/^[a-zA-Z0-9_-]*$/.test(newName)) {
      setWarning('Project name should contain only lowercase letters, numbers, hyphens (-), or underscores (_).')
    } else {
      setWarning('')
      setProjectConfig((prev) => ({ ...prev, name: newName }))
    }
  }
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-300">Project Name *</span>
        <input
          type="text"
          required
          className="mt-1 px-3 py-3 block w-full rounded bg-gray-800 border-gray-700 text-white"
          value={projectConfig.name}
          onChange={handleInputChange}
          placeholder="my-node-project"
          name='projectName'
        />
        {warning && (
        <p className="text-yellow-500 text-sm mt-1" role="alert">
          {warning}
        </p>
      )}
      </label>

      <label className="block">
        <span className="text-gray-300">Description</span>
        <textarea
          className="mt-1 px-3 py-3 block w-full rounded bg-gray-800 border-gray-700 text-white"
          value={projectConfig.description}
          onChange={e => setProjectConfig(prev => ({ ...prev, description: e.target.value }))}
          rows="2"
          placeholder="A brief description of your project"
          name='projectDescription'
        />
      </label>

      <label className="block">
        <span className="text-gray-300">Author</span>
        <input
          type="text"
          className="mt-1 py-3 px-3 block w-full rounded bg-gray-800 border-gray-700 text-white"
          value={projectConfig.author}
          onChange={e => setProjectConfig(prev => ({ ...prev, author: e.target.value }))}
          placeholder="John Doe <john@example.com>"
          name='projectAuthor'
        />
      </label>
    </div>
  )
}