export function isValid(board: number[][], row: number, col: number, num: number) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % 3), startCol = col - (col % 3);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[i + startRow][j + startCol] === num) return false;
  return true;
}

export function isSolvable(board: number[][]) {
  const trySolve = (b: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (b[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(b, row, col, num)) {
              b[row][col] = num;
              if (trySolve(b)) return true;
              b[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  return trySolve(board.map(row => [...row]));
}

export function solveSudoku(board: number[][]): number[][] | null {
  const b = board.map(row => [...row]);
  const solve = (): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (b[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(b, row, col, num)) {
              b[row][col] = num;
              if (solve()) return true;
              b[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  return solve() ? b : null;
}

export function validateBoard(b: number[][]) {
  const errs = Array.from({ length: 9 }, () => Array(9).fill(false));
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set(), colSet = new Set();
    for (let j = 0; j < 9; j++) {
      if (b[i][j] && rowSet.has(b[i][j])) errs[i][j] = true;
      rowSet.add(b[i][j]);
      if (b[j][i] && colSet.has(b[j][i])) errs[j][i] = true;
      colSet.add(b[j][i]);
    }
  }
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxSet = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const val = b[boxRow * 3 + i][boxCol * 3 + j];
          if (val && boxSet.has(val)) errs[boxRow * 3 + i][boxCol * 3 + j] = true;
          boxSet.add(val);
        }
      }
    }
  }
  return errs;
}