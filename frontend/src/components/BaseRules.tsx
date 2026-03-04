interface BaseRulesProps {
  typedWords: string[];
  startWord: string;
}

export default function BaseRules({ typedWords, startWord }: BaseRulesProps) {
  const bannedWord =
    typedWords.length == 0
      ? startWord.toUpperCase()
      : typedWords.at(-1)?.toUpperCase();
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm sm:max-w-xl md:max-w-2xl min-h-24 sm:min-h-32 md:min-h-40 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-lg border-2 sm:border-3 md:border-4 border-green-400 px-4 sm:px-5 md:px-6 py-4 sm:py-6 md:py-8 items-start justify-center">
      <span className="text-green-700 font-mono text-base sm:text-lg md:text-xl">
        {"1. Must be a valid word with length greater than 2"}
      </span>
      <div>
        <span className="text-green-700 font-mono text-base sm:text-lg md:text-xl whitespace-pre-wrap">
          {"2. Must not use any letters from previous word:"}
        </span>
        <span className="bg-blue-600 px-2 py-1 text-white ml-2 rounded-sm font-mono text-base sm:text-lg md:text-xl">
          {bannedWord}
        </span>
      </div>
      <span className="text-green-700 font-mono text-base sm:text-lg md:text-xl">
        {"3. Must not repeat any previous word"}
      </span>
    </div>
  );
}
