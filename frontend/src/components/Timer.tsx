import { useEffect } from "react";

interface TimerProps {
  currTime: number;
  setCurrTime: React.Dispatch<React.SetStateAction<number>>;
  gameOver: boolean;
}

export default function Timer({ currTime, setCurrTime, gameOver }: TimerProps) {
  useEffect(() => {
    if (currTime <= 0 || gameOver == true) {
      return;
    }

    const id = setInterval(() => {
      setCurrTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(id); //cleanup function
  }, [currTime]);

  const getColor = () => {
    if (currTime > 10) return "text-green-400";
    if (currTime > 5) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div
      className={`font-mono text-4xl md:text-5xl font-semibold tracking-wider transition-colors duration-300 ${getColor()}`}
    >
      {currTime}
    </div>
  );
}
