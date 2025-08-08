'use client'

import Link from 'next/link'
import { FiDownload } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/20 shadow-sm">
      <div className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-blue-300/30 transition-all">
            <FiDownload className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Tok<span className="text-blue-500">DL</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          <Link href="/" className="px-4 py-2 rounded-lg hover:bg-blue-50/50 text-blue-900/80 transition-all">
            Home
          </Link>
          <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-blue-50/50 text-blue-900/80 transition-all">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}