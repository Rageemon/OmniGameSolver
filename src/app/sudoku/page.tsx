import type { Metadata } from "next";
import SudokuSolver from "./SudokuSolver";

export function generateMetadata(): Metadata {
  return {
    title: "Sudoku Solver - Free Online Sudoku Puzzle Solver",
    description:
      "Solve any Sudoku puzzle instantly with our free, modern, and user-friendly Sudoku solver. Enter your puzzle and get the solution in seconds.",
    openGraph: {
      title: "Sudoku Solver - Free Online Sudoku Puzzle Solver",
      description:
        "Solve any Sudoku puzzle instantly with our free, modern, and user-friendly Sudoku solver.",
      url: "https://yourdomain.com/sudoku",
      siteName: "Omni Game Hub",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sudoku Solver",
      description: "Solve Sudoku puzzles online instantly — no signup needed.",
    },
  };
}

export default function SudokuPage() {
  return <SudokuSolver />;
}
