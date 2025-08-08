export default function Loading() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 max-w-md text-center">
        {/* Loading animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-r-blue-400 animate-ping"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-blue-900 mb-2">Processing Video</h2>
        <p className="text-gray-600 mb-4">Please wait while we fetch your TikTok video...</p>
        
        {/* Progress indicators */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Analyzing URL</span>
            <span>✓</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Fetching video data</span>
            <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>Preparing download</span>
            <span>⏳</span>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          This usually takes 2-5 seconds
        </div>
      </div>
    </div>
  )
}
