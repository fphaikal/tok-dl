export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="glass-card p-8 max-w-md text-center">
        {/* Loading animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-slate-600 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Loading</h2>
        <p className="text-slate-600 dark:text-slate-400">Please wait...</p>
      </div>
    </div>
  )
}
