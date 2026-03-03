interface WordProps {
  word: string;
}

export default function Word({ word }: WordProps) {
  return (
    <div className="bg-green-500 text-white font-mono font-bold px-4 py-2 rounded-lg shadow-md">
      {word}
    </div>
  );
}
