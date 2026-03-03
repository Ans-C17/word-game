export default function GameOver() {
  const score = 12;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-yellow-200 px-8 py-9 text-center">
        <p className="text-gray-400 text-base mb-4">You’re out.</p>

        <div className="text-7xl sm:text-8xl font-extrabold text-yellow-600 leading-none">
          {score}
        </div>

        <p className="text-gray-600 text-2xl mt-2 mb-8">words</p>

        <div className="flex gap-4">
          <button className="flex-1 rounded-xl border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 text-lg transition-all duration-200">
            Again
          </button>

          <button className="flex-1 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-lg transition-all duration-200 shadow-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
