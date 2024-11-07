import { FaLayerGroup } from 'react-icons/fa'

export default function ArchitectureInfo() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <FaLayerGroup className="text-green-500 text-xl" />
        <h2 className="text-lg font-semibold">MVC Architecture</h2>
      </div>
      <p className="text-gray-300 text-sm">
        Your project will be generated with a clean MVC (Model-View-Controller) architecture:
      </p>
      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
        <div className="bg-gray-700 p-3 rounded">
          <h3 className="font-medium mb-1">Models</h3>
          <p className="text-gray-400">Data structure and business logic</p>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <h3 className="font-medium mb-1">Views</h3>
          <p className="text-gray-400">Template rendering and responses</p>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <h3 className="font-medium mb-1">Controllers</h3>
          <p className="text-gray-400">Request handling and routing logic</p>
        </div>
      </div>
    </div>
  )
}