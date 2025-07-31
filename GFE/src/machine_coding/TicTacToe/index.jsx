import React, { useState } from "react";
import styles from "./Game.module.css";
import { useTicTacToe } from "../../custom_hooks/useTicTacToe";

const TicTacToe = () => {
  const { board, getStatus, handleClick, resetBoard } = useTicTacToe();
  return (
    <div className={styles.game}>
      <div className={styles.gamedetails}>
        <span>{getStatus()}</span>
        <button onClick={resetBoard}>reset</button>
      </div>
      <div className={styles.board}>
        {board.map((b, index) => {
          return (
            <button
              key={index}
              className={styles.cell}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
