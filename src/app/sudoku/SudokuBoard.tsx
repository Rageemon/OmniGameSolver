import React from "react";

export default function SudokuBoard({
  board,
  onChange,
  errors
}: {
  board: number[][],
  onChange: (row: number, col: number, value: number) => void,
  errors: boolean[][]
}) {
  return (
    <div className="inline-block bg-zinc-900 rounded-2xl p-4 shadow-2xl">
      {board.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((cell, j) => (
            <input
              key={j}
              className={[
                "w-10 h-10 m-0.5 text-center text-xl font-bold rounded-md outline-none transition-colors border-2",
                "bg-zinc-800 text-white",
                errors[i][j]
                  ? "border-red-500 bg-red-950"
                  : "border-zinc-700 focus:border-cyan-400",
                i % 3 === 2 && "border-b-4",
                j % 3 === 2 && "border-r-4"
              ].filter(Boolean).join(" ")}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={cell === 0 ? "" : cell}
              onChange={e => {
                const val = parseInt(e.target.value);
                onChange(i, j, isNaN(val) ? 0 : val);
              }}
              aria-label={`Row ${i + 1} Column ${j + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}