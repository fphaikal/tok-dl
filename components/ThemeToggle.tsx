'use client'

import { useTheme } from './ThemeProvider'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900 dark:hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <FiSun
          className={`absolute inset-0 text-amber-500 transition-all duration-300 ${resolvedTheme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-0'
            }`}
        />
        <FiMoon
          className={`absolute inset-0 text-blue-400 transition-all duration-300 ${resolvedTheme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-90 scale-0'
            }`}
        />
      </div>
    </button>
  )
}
