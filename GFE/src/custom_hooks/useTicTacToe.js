import { useState } from "react";

const initialBoard = () => {
  return Array(9).fill(null);
};

export const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard());
  const [activeX, setActiveX] = useState(true);

  const WINING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(board) {
    for (let i = 0; i < WINING_PATTERN.length; i++) {
      const [a, b, c] = WINING_PATTERN[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  const getStatus = () => {
    const winner = checkWinner(board);
    if (winner) return `Player ${winner} won the game`;
    if (!board.includes(null)) return `Its a Draw!`;
    return `Player ${activeX ? "X" : "O"} turn`;
  };

  const handleClick = (idx) => {
    const winner = checkWinner(board);
    if (winner) return;
    const newBoard = [...board];
    newBoard[idx] = activeX ? "X" : "O";
    setBoard(newBoard);
    setActiveX(!activeX);
  };

  const resetBoard = () => {
    setBoard(initialBoard());
    setActiveX(true);
  };

  return { board, getStatus, handleClick, resetBoard };
};
