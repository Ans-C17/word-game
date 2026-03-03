import { useMemo, useState, useEffect } from "react";

interface NewRandomRulesProps {
  typedWords: string[];
  startWord: string;
}

const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

export default function NewRandomRules({
  typedWords,
  startWord,
}: NewRandomRulesProps) {
  const [choosableAlphabets, setChoosableAlphabets] = useState(alphabets);
  useEffect(() => {
    setChoosableAlphabets(
      alphabets.filter(
        (alphabet) =>
          !(
            typedWords.length > 0
              ? typedWords[typedWords.length - 1]
              : startWord
          ).includes(alphabet),
      ),
    );
  }, [typedWords]);

  const bannedLetter =
    choosableAlphabets[Math.floor(Math.random() * choosableAlphabets.length)]; //for rule 1

  const newRules = {
    1: `Can't use the letter ${bannedLetter}`,
    2: `Must use the letter jsdfosdf`,
  };

  const randomRule = useMemo(() => {
    return Object.values(newRules)[
      Math.floor(Math.random() * Object.values(newRules).length)
    ];
  }, [choosableAlphabets]);

  return (
    <div
      className={`${typedWords.length >= 5 ? "" : "hidden"} w-full max-w-sm sm:max-w-xl md:max-w-2xl rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-lg border-2 sm:border-3 md:border-4 border-rose-400 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5`}
    >
      <span className="text-rose-700 font-mono text-base sm:text-lg md:text-xl">
        {randomRule}
      </span>
    </div>
  );
}
