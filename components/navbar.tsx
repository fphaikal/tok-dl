'use client'

import Link from 'next/link'
import { FiDownload } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass-nav shadow-sm">
      <div className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-blue-300/30 dark:group-hover:shadow-blue-500/20 transition-all">
            <FiDownload className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold gradient-text-blue">
            Tok<span className="text-blue-500 dark:text-blue-400">DL</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex space-x-1">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-blue-50/50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 transition-all">
              Home
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-blue-50/50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 transition-all">
              About
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}