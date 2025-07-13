"use client";

import React, { useState } from "react";
import SudokuBoard from "./SudokuBoard";
import ErrorDisplay from "./ErrorDisplay";
import { isSolvable, solveSudoku, validateBoard } from "./sudokuUtils";

export default function SudokuSolver() {
  const empty = Array.from({ length: 9 }, () => Array(9).fill(0));
  const [board, setBoard] = useState<number[][]>(empty);
  const [errors, setErrors] = useState<boolean[][]>(
    empty.map((row) => row.map(() => false))
  );
  const [error, setError] = useState("");
  const [solved, setSolved] = useState<number[][] | null>(null);

  const handleChange = (row: number, col: number, value: number) => {
    if (value < 0 || value > 9) return;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);
    setSolved(null);
    setError("");
    setErrors(validateBoard(newBoard));
  };

  const handleSolve = () => {
    const errs = validateBoard(board);
    setErrors(errs);
    if (errs.flat().some(Boolean)) {
      setError("Please fix highlighted errors before solving.");
      setSolved(null);
      return;
    }
    if (!isSolvable(board)) {
      setError("This Sudoku puzzle is not solvable.");
      setSolved(null);
      return;
    }
    const solution = solveSudoku(board);
    if (solution) {
      setSolved(solution);
      setError("");
    } else {
      setError("No solution found.");
      setSolved(null);
    }
  };

  const handleClear = () => {
    setBoard(empty);
    setSolved(null);
    setError("");
    setErrors(empty.map((row) => row.map(() => false)));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-cyan-400 font-bold text-4xl mb-4 tracking-wide text-center">
        Sudoku Solver - Free Online Sudoku Puzzle Solver
      </h1>
      <p className="text-zinc-300 mb-8 text-lg text-center max-w-xl">
        Enter your Sudoku puzzle below. The solver will check for errors and solve
        instantly!
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl">
        {/* Board */}
        <div className="flex flex-col items-center w-full max-w-fit">
          <SudokuBoard
            board={solved || board}
            onChange={handleChange}
            errors={errors}
          />
          <ErrorDisplay error={error} />
        </div>

        {/* Controls */}
        <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-48 justify-center mt-6 lg:mt-0">
          <button
            onClick={handleSolve}
            className="bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg px-6 py-3 font-semibold text-lg shadow-lg transition-colors w-full"
          >
            Solve
          </button>
          <button
            onClick={handleClear}
            className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg px-6 py-3 font-semibold text-lg shadow w-full"
          >
            Clear
          </button>
        </div>
      </div>

      <footer className="mt-10 text-zinc-400 text-base text-center">
        &copy; {new Date().getFullYear()} Modern Sudoku Solver
      </footer>
    </main>
  );
}
