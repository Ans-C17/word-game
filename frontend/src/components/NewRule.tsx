interface NewRuleProps {
  rule: string;
}

export default function NewRule({ rule }: NewRuleProps) {
  return (
    <div
      className={`w-full max-w-sm sm:max-w-xl md:max-w-2xl rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-lg border-2 sm:border-3 md:border-4 border-rose-400 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5`}
    >
      <span className="text-rose-700 font-mono text-base sm:text-lg md:text-xl">
        {rule}
      </span>
    </div>
  );
}
