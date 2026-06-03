import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'

const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/chatbox', label: 'Chat AI' },
    { path: '/pomodoro', label: 'Pomodoro' }
  ]

  return (
    <nav className="w-full m-auto px-6 py-4 bg-[hsl(250,62%,15%)] border-b border-gray-700 flex items-center justify-between">

      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <div className="text-white text-2xl font-bold tracking-wide">
          Study<span className="text-purple-400">Buddy</span>
        </div>

        
        <div className="hidden md:flex gap-6 text-gray-300 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition px-3 py-2 rounded-md ${
                isActive(link.path)
                  ? 'text-white font-semibold underline underline-offset-4 decoration-purple-500'
                  : 'hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <MdClose /> : <GiHamburgerMenu />}
          </button>

          <Link
            to="/"
            className="px-4 py-1.5 text-lg rounded-md bg-purple-600 hover:bg-purple-700 text-white transition"
          >
            Log out
          </Link>
        </div>
      </div>

      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[hsl(250,62%,15%)] border-b border-gray-700 md:hidden">
          <div className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`py-2 px-3 rounded-md transition ${
                  isActive(link.path)
                    ? 'text-purple-400 font-semibold bg-purple-500 bg-opacity-20'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar