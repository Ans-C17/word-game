import { useMemo, useEffect, useState } from "react";
import Timer from "./Timer";
import { Input } from "@/components/ui/input";
import wordsList from "@/data/words.json";
import starterWordsList from "@/data/starters.json";
import BaseRules from "./BaseRules";
import BottomWords from "./BottomWords";
import NewRandomRules from "./NewRule";
import GameOver from "./GameOver";
import { toast } from "sonner";

const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
const wordSet = new Set(wordsList);
const startWord =
  starterWordsList[Math.floor(Math.random() * starterWordsList.length)];

function hasCommonLetter(currWord: string, prevWord: string) {
  for (let letter of prevWord) {
    if (currWord.includes(letter)) {
      return true;
    }
  }

  return false;
}

function wordObeysBasicRules(
  text: string,
  typedWords: string[],
  startWord: string,
) {
  return (
    !hasCommonLetter(
      text,
      typedWords.length > 0 ? typedWords[typedWords.length - 1] : startWord,
    ) &&
    text != startWord &&
    !typedWords.includes(text)
  );
}

export default function Game() {
  const timeout = 60;

  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currTime, setCurrTime] = useState(timeout);
  const [choosableAlphabets, setChoosableAlphabets] = useState(alphabets);

  const chosenAlphabet = useMemo(() => {
    return choosableAlphabets[
      Math.floor(Math.random() * choosableAlphabets.length)
    ];
  }, [choosableAlphabets]);

  const wordLength = useMemo(() => {
    return Math.floor(Math.random() * 3) + 1;
  }, [typedWords]);

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

  const newRules = {
    1: `Can't use the letter ${chosenAlphabet}`,
    2: `Word Must use the letter ${chosenAlphabet}`,
    3: `Word length must be atleast ${wordLength}`,
    4: "Word must not repeat any letter",
    5: "Word must repeat a letter",
    6: `Word must start with ${chosenAlphabet}`,
    7: `Word must end  with ${chosenAlphabet}`,
    8: "Word must have a vowel",
  };

  const newRandomRule = useMemo(() => {
    const [key, value] =
      Object.entries(newRules)[
        Math.floor(Math.random() * Object.values(newRules).length)
      ];

    return [key, value];
  }, [choosableAlphabets]);

  function wordObeysNewRules(ruleId: string, word: string) {
    switch (ruleId) {
      case "1":
        return !word.includes(chosenAlphabet);

      case "2":
        return word.includes(chosenAlphabet);

      case "3":
        return word.length > wordLength;

      case "4":
        const uniqCharsCase4 = new Set(word);
        return uniqCharsCase4.size == word.length;

      case "5":
        const uniqCharsCase5 = new Set(word);
        return uniqCharsCase5.size != word.length;

      case "6":
        return word.startsWith(chosenAlphabet);

      case "7":
        return word.endsWith(chosenAlphabet);

      case "8":
        return [...word].some((c) => "aeiou".includes(c));
    }
  }

  function handleInput(text: string) {
    setInputValue(text);

    if (text.at(-1) == " ") {
      if (text != " ") {
        text = text.trim();
        if (!wordSet.has(text)) {
          if (text.length <= 2) {
            toast.warning("Word length must be greater than 2", {
              duration: 1200,
              className:
                "bg-red-600 text-white border border-red-800 font-mono font-semibold px-4 py-3 rounded-md",
            });
          } else {
            toast.warning("Invalid word", {
              duration: 1200,
              className:
                "bg-red-600 text-white border border-red-800 font-mono font-semibold px-4 py-3 rounded-md",
            });
          }
        } else if (
          !wordObeysBasicRules(text, typedWords, startWord) ||
          (typedWords.length >= 5 && !wordObeysNewRules(newRandomRule[0], text))
        ) {
          setIsGameOver(true);
        } else {
          setTypedWords((prev) => [...prev, inputValue]);
        }
      }

      setInputValue("");
    }
  }

  //IF TIME IS OVER GAME ENDS OBVIOUSLY
  useEffect(() => {
    if (currTime <= 0) setIsGameOver(true);
  }, [currTime]);

  //THE OFFICIAL RETURN STATEMENT
  return (
    <main className="bg-yellow-100 flex flex-col gap-4 sm:gap-6 md:gap-8 h-screen justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden relative">
      {isGameOver && <GameOver score={typedWords.length} />}

      <div className="absolute top-10 sm:top-14 md:top-20 right-10 sm:right-14 md:right-20">
        <Timer
          currTime={currTime}
          setCurrTime={setCurrTime}
          gameOver={isGameOver}
        />
      </div>

      <BaseRules typedWords={typedWords} startWord={startWord} />

      {typedWords.length >= 5 && <NewRandomRules rule={newRandomRule[1]} />}

      <Input
        className="w-full max-w-sm sm:max-w-xl md:max-w-2xl h-14 sm:h-16 md:h-20 text-lg sm:text-xl md:text-2xl bg-white border-yellow-400 border-2 focus-visible:border-black focus-visible:ring-0 font-mono placeholder:text-gray-400 px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4"
        placeholder="Press space to submit word"
        autoFocus
        value={inputValue}
        onChange={(e) => handleInput(e.target.value.toLowerCase())}
        onPaste={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key == "Enter") handleInput(inputValue + " "); //MUST ADD SPACE AT THE END SO HANDLEINPUT WORKS
        }}
      />

      <BottomWords typedWords={typedWords} />
    </main>
  );
}
