import Word from "./Word";

interface BottomWordsProps {
  typedWords: string[];
}

export default function BottomWords({ typedWords }: BottomWordsProps) {
  return (
    <div
      className={`flex flex-wrap gap-3 w-full max-w-sm sm:max-w-xl md:max-w-2xl min-h-28 sm:min-h-32 md:min-h-40 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-lg border-2 sm:border-3 md:border-4 border-blue-400 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 ${typedWords.length === 0 ? "items-center justify-center content-center" : "items-start justify-start content-start"}`}
    >
      {typedWords.length == 0 ? (
        <span className="text-blue-700 font-mono text-sm sm:text-base md:text-lg">
          words appear here
        </span>
      ) : (
        typedWords.map((word) => <Word word={word} />)
      )}
    </div>
  );
}
