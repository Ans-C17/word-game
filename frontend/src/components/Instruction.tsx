import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface InstructionProps {
  onStart: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Instruction({ onStart }: InstructionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center bg-black/20 p-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-4xl min-h-[60vh] bg-blue-50/95 border-4 border-blue-300 rounded-2xl shadow-2xl flex flex-col items-center font-mono text-center text-lg sm:text-xl md:text-2xl p-8 sm:p-10 md:p-12 transform transition-transform transition-opacity duration-300 will-change-[transform,opacity] ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex-1 flex flex-col justify-center gap-6 max-w-2xl">
          <div className="text-2xl sm:text-3xl font-bold text-blue-900">
            GAME RULES
          </div>

          <div className="text-left space-y-3 text-base sm:text-lg md:text-xl text-blue-900">
            <p>1. Enter a valid English word.</p>
            <p>
              2. Words must be at least <b>3 letters</b>.
            </p>
            <p>
              3. Your word must <b>share no letters</b> with the previous word.
            </p>
            <p>
              4. You <b>cannot reuse</b> a word.
            </p>
            <p>
              5. After <b>5 words</b>, a random challenge rule appears.
            </p>

            <div className="pt-4 border-t border-blue-200 space-y-2">
              <p className="text-red-600 font-semibold">
                ❌ Breaking rules 3–5 ends the game.
              </p>
              <p className="text-amber-600 font-semibold">
                ⚠ Breaking rules 1–2 only show a warning.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onStart}
          className="mt-8 text-base sm:text-lg md:text-xl px-6 py-3 font-bold"
        >
          START GAME
        </Button>
      </div>
    </div>
  );
}
