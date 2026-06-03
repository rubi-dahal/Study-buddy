import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full px-30  m-auto px-6 py-4 bg-[hsl(250,62%,15%)] border-b border-gray-700 flex items-center justify-between">

      
      <div className="text-white text-xl font-bold tracking-wide">
        Study<span className="text-purple-400">Buddy</span>
      </div>

      
      <div className="hidden md:flex gap-6 text-gray-300 text-sm">
        
        <Link className="hover:text-white transition" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-white transition" to="/chatbox">Chat</Link>
      </div>

      
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="px-4 py-1.5 text-sm rounded-md bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          Log out
        </Link>
      </div>

    </nav>
  )
}

export default Navbar