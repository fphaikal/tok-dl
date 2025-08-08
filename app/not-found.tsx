'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 max-w-md text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4 relative">
            4
            <span className="inline-block animate-bounce mx-2">0</span>
            4
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          The URL might be incorrect or the page may have been moved.
        </p>
        
        {/* Action buttons */}
        <div className="space-y-3 mb-8">
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>
        
        {/* Helpful links */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="space-y-2 text-sm">
            <Link 
              href="/" 
              className="block text-blue-600 hover:text-blue-800 transition-colors"
            >
              → Download TikTok Videos
            </Link>
            <Link 
              href="/api/v1" 
              className="block text-blue-600 hover:text-blue-800 transition-colors"
            >
              → API Documentation
            </Link>
          </div>
        </div>
      </div>
      
      {/* SEO Content */}
      <div className="max-w-2xl mt-12 text-center">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Continue Using TokDL</h2>
        <p className="text-gray-600 mb-6">
          TokDL is the best free TikTok video downloader. Download any TikTok video in HD quality 
          without watermarks. Fast, secure, and completely free to use.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="backdrop-blur-sm bg-white/30 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">HD Quality</h3>
            <p className="text-gray-600">Download videos in the highest quality available</p>
          </div>
          <div className="backdrop-blur-sm bg-white/30 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">No Watermark</h3>
            <p className="text-gray-600">Get clean videos without TikTok branding</p>
          </div>
          <div className="backdrop-blur-sm bg-white/30 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">100% Free</h3>
            <p className="text-gray-600">No fees, no registration, no limits</p>
          </div>
        </div>
      </div>
    </div>
  )
}
