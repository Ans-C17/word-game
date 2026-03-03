import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Input } from "@/components/ui/input";
import wordsList from "@/data/words.json";
import starterWordsList from "@/data/starters.json";
import BaseRules from "./BaseRules";
import BottomWords from "./BottomWords";
import NewRandomRules from "./NewRandomRules";
import GameOver from "./GameOver";

const startWord =
  starterWordsList[Math.floor(Math.random() * starterWordsList.length)];

const wordSet = new Set(wordsList);

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
    !typedWords.includes(text) &&
    wordSet.has(text)
  );
}

export default function Game() {
  const timeout = 60;

  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currTime, setCurrTime] = useState(timeout);

  useEffect(() => {
    if (currTime <= 0) setIsGameOver(true);
  }, [currTime]);

  function handleInput(text: string) {
    setInputValue(text);

    if (text.at(-1) == " ") {
      if (text != " ") {
        text = text.trim();
        if (wordObeysBasicRules(text, typedWords, startWord) && currTime > 0) {
          setTypedWords((prev) => [...prev, inputValue]);
        } else {
          setIsGameOver(true);
        }
      }

      setInputValue("");
    }
  }

  return (
    <main className="bg-yellow-100 flex flex-col gap-4 sm:gap-6 md:gap-8 h-screen justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden relative">
      {isGameOver && <GameOver />}

      <div className="absolute top-10 sm:top-14 md:top-20 right-10 sm:right-14 md:right-20">
        <Timer currTime={currTime} setCurrTime={setCurrTime} />
      </div>

      <BaseRules typedWords={typedWords} startWord={startWord} />

      <NewRandomRules typedWords={typedWords} startWord={startWord} />

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
        //TODO: ENTER SHOULD ALSO SUBMIT WORD
      />

      <BottomWords typedWords={typedWords} />
    </main>
  );
}
