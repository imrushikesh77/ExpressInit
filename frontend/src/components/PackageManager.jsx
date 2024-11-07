import { FaNpm, FaYarn } from 'react-icons/fa'

export default function PackageManager({ packageManager, setPackageManager }) {
  return (
    <div className="space-y-2">
      <h3 className="text-gray-300">Package Manager</h3>
      <div className="flex gap-4">
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            packageManager === 'npm'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setPackageManager('npm')}
        >
          <FaNpm className="text-xl" />
          npm
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            packageManager === 'yarn'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setPackageManager('yarn')}
        >
          <FaYarn className="text-xl" />
          yarn
        </button>
      </div>
    </div>
  )
}