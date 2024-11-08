import { FaGithub } from 'react-icons/fa'
import { SiExpress } from "react-icons/si";

export default function Header() {
  return (
    <header className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SiExpress className="text-green-500 text-4xl" />
        <h1 className="text-2xl font-bold">Express Initializer</h1>
      </div>
      <a href="https://github.com/imrushikesh77/ExpressInit" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
        <FaGithub className="text-2xl" />
      </a>
    </header>
  )
}