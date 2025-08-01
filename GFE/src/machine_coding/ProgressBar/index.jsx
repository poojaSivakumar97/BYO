import React, { useState, useEffect } from "react";
import styles from "./Progress.module.css";

export const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(progress);
    }, 300);
  }, [progress]);
  return (
    <div>
      <div className={styles.outer}>
        <div
          style={{ transform: `translateX(${animatedProgress - 100}%)` }}
          className={styles.inner}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemax={100}
          aria-valuemin={0}
        >
          {progress}
        </div>
      </div>
    </div>
  );
};
