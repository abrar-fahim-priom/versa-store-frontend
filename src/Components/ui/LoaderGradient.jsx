export default function LoaderGradient() {
  return (
    <div className="flex flex-col dark items-center justify-center min-h-screen bg-white dark:bg-neutral-700">
      {/* Spinning Gradient Circle */}
      <div className="relative flex items-center justify-center">
        <div className="p-1 bg-gradient-to-tr animate-spin from-blue-400 to-blue-600 via-blue-300 dark:from-slate-500 dark:to-white dark:via-slate-100 rounded-full">
          <div className="bg-white dark:bg-neutral-700 rounded-full">
            <div className="w-10 h-10 bg-white dark:bg-neutral-700 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Loading Text with Animated Color and Dots */}
      <div className="text-2xl font-semibold mt-4 flex items-center space-x-1">
        <span className="animate-bounce text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700">
          .
        </span>
        <span className="animate-bounce [animation-delay:0.2s] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-white dark:to-white">
          .
        </span>
        <span className="animate-bounce [animation-delay:0.4s] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-white dark:to-white">
          .
        </span>
      </div>
    </div>
  );
}
