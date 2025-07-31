import React, { useState, useRef, useEffect } from "react";
import styles from "./AutoComplete.module.css";

const ResultContainer = ({ recipes, setUserInput }) => {
  const [focusedIdx, setFocusedIndex] = useState(0);
  const spanRefs = useRef([]);
  useEffect(() => {
    spanRefs.current[focusedIdx]?.focus();
  }, [focusedIdx]);

  function handleKeyDown(e) {
    if (e.key == "ArrowDown") {
      setFocusedIndex((prevId) => (prevId + 1) % recipes.length);
    } else if (e.key == "ArrowUp") {
      setFocusedIndex(
        (prevId) => (prevId - 1 + recipes.length) % recipes.length
      );
    } else if (e.key === "Enter") {
      setUserInput(recipes[focusedIdx].name);
    }
  }
  return (
    <div
      className={styles.resultContainer}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {recipes.map((item, index) => (
        <span
          ref={(el) => (spanRefs.current[index] = el)}
          className={styles.item}
          key={index}
          onClick={() => setUserInput(item.name)}
          tabIndex={-1}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default ResultContainer;
