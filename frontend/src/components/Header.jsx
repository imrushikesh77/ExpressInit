import { FaGithub } from 'react-icons/fa'
import { SiExpress } from "react-icons/si"
import { FaUsers } from "react-icons/fa"
import { useState, useEffect } from 'react'

export default function Header({userCount}) {
  return (
    <header className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SiExpress className="text-green-500 text-4xl" />
        <h1 className="text-2xl font-bold">Express Initializer</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center text-gray-400">
          <FaUsers className="mr-2 text-lg" />
          <span className="text-sm">{userCount.toLocaleString()} users</span>
        </div>
        <a 
          href="https://github.com/imrushikesh77/ExpressInit" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white"
          aria-label="View source on GitHub"
        >
          <FaGithub className="text-2xl" />
        </a>
      </div>
    </header>
  )
}