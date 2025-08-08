'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="text-red-500 mb-6">
          <svg 
            className="h-16 w-16 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error while processing your request. 
          This might be due to a temporary server issue or an invalid TikTok URL.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Again
          </Button>
          
          <Link href="/">
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Go Back Home
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          <p>Having trouble? Try these tips:</p>
          <ul className="text-left mt-2 space-y-1">
            <li>• Make sure the TikTok URL is valid</li>
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
