import { useState } from 'react'
import { FaSearch, FaSpinner } from 'react-icons/fa'

export default function DependencySearch({ packageManager, onDependencySelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const searchDependencies = async (term) => {
    if (!term) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const registry = 'https://registry.npmjs.org/-/v1/search';
      
      const response = await fetch(`${registry}?text=${term}&size=5`)
      const data = await response.json()
      setSearchResults(data.objects.map(obj => ({
        name: obj.package.name,
        version: obj.package.version,
        description: obj.package.description
      })))
    } catch (error) {
      console.error('Failed to search dependencies:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term.length >= 2) {
      const debounce = setTimeout(() => searchDependencies(term), 300)
      return () => clearTimeout(debounce)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 border-gray-700 text-white"
          placeholder={`Search ${packageManager} packages...`}
          value={searchTerm}
          onChange={handleSearch}
          name='dependencySearchTerm'
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-2 space-y-2 bg-gray-800 rounded p-2">
          {searchResults.map(pkg => (
            <div
              key={pkg.name}
              className="p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => {
                onDependencySelect(pkg)
                setSearchTerm('')
                setSearchResults([])
              }}
            >
              <div className="font-medium">{pkg.name}</div>
              <div className="text-sm text-gray-400">{pkg.version}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}