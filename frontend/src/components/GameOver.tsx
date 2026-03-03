//TODO: TELL REASON OF FAILURE (MUST)
type CustomBtnProps = {
  text: string;
  mode?: "yellow" | "danger";
};

function CustomBtn({ text, mode = "yellow" }: CustomBtnProps) {
  const base =
    "flex-1 relative cursor-pointer rounded-xl border-2 font-bold py-3.5 text-base overflow-hidden group tracking-wide uppercase";

  const variants = {
    yellow: "border-yellow-400 text-yellow-500",
    danger: "border-red-400 text-red-500",
  };

  const fillColor = mode === "yellow" ? "bg-yellow-400" : "bg-[#dd0000]";

  const btnShadow =
    mode === "yellow"
      ? "0 2px 10px rgba(234,179,8,0.25), inset 0 1px 0 rgba(255,255,255,0.6)"
      : "0 2px 10px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.6)";

  return (
    <button
      className={`${base} ${variants[mode]} `}
      style={{
        boxShadow: btnShadow,
        transition: "box-shadow 0.2s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1.5px)";
        e.currentTarget.style.boxShadow =
          mode === "yellow"
            ? "0 6px 18px rgba(234,179,8,0.38), inset 0 1px 0 rgba(255,255,255,0.4)"
            : "0 6px 18px rgba(239,68,68,0.32), inset 0 1px 0 rgba(255,255,255,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = btnShadow;
      }}
    >
      <span
        className={`absolute w-[120%] rounded-r-full inset-0 ${fillColor} -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out`}
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}

export default function GameOver() {
  const score = 12;
  const shadowString = `
  rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
  rgba(0, 0, 0, 0.6) 0px 2px 1px,
  rgba(0, 0, 0, 0.09) 0px 4px 2px,
  rgba(0, 0, 0, 0.02) 0px 8px 4px,
  rgba(0, 0, 0, 0.02) 0px 16px 8px,
  rgba(0, 0, 0, 0.02) 0px 32px 16px
`;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        className="w-full max-w-sm rounded-3xl bg-white border border-yellow-100 px-10 py-10 text-center"
        style={{
          boxShadow: shadowString,
        }}
      >
        <p
          className="text-xs font-bold tracking-[0.25em] uppercase text-yellow-400 mb-4"
          style={{ textShadow: "0 1px 6px rgba(234,179,8,0.35)" }}
        >
          Game Over
        </p>
        <div
          className="text-9xl font-black leading-none text-yellow-400 tabular-nums"
          style={{
            textShadow:
              "0 2px 4px rgba(234,179,8,0.2), 0 8px 24px rgba(234,179,8,0.18)",
            letterSpacing: "-0.03em",
          }}
        >
          {score}
        </div>

        {/* Subline */}
        <p
          className="text-gray-400 text-sm font-medium tracking-widest uppercase mt-2 mb-6"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          words guessed
        </p>

        {/* Divider */}
        <div className="w-10 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-yellow-200 to-transparent" />

        {/* Share line */}
        <p
          className="text-gray-600 text-lg font-semibold tracking-tight mb-6"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
        >
          Share with friends
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <CustomBtn text="Again" mode="yellow" />
          <CustomBtn text="Send" mode="danger" />
        </div>
      </div>
    </div>
  );
}
