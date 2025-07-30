import React from "react";
import styles from "./AutoComplete.module.css";

const ResultContainer = ({ recipes, setUserInput }) => {
  return (
    <div className={styles.resultContainer}>
      {recipes.map((item) => (
        <span
          className={styles.item}
          key={item.id}
          onClick={() => setUserInput(item.name)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default ResultContainer;
