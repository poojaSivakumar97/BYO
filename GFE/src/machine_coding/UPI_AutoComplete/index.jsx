import React, { useState } from "react";
import styles from "./upi.module.css";
import { BANK_UPI_HANDLES } from "./constants";
const UPIForm = () => {
  const [upiId, setUpiId] = useState("");
  const [predictedBank, setPredictedBank] = useState("");
  const [predictionList, setPredictionList] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1); // for arrow key navigation

  function handleUPIIdChange(e) {
    const { value } = e.target;
    setUpiId(value);
    if (!value.includes("@")) {
      setPredictedBank(value || "");
      setPredictionList([]);
      return;
    }
    const [currentUserVPA, currentUserBankName] = value.split("@");
    if (!currentUserVPA) return;
    const matchingBankName = new RegExp(currentUserBankName);
    const matchingBanks = BANK_UPI_HANDLES.filter((bankName) => {
      return matchingBankName.test(bankName);
    });
    setPredictionList(matchingBanks);
    let currentPredictedBankName = matchingBanks[0];
    if (currentUserVPA && !matchingBanks.length) {
      currentPredictedBankName = "";
    }
    setPredictedBank(`${currentUserVPA}@${currentPredictedBankName}`);
  }
  function handleKeyDownStroke(e) {
    const { keyCode = -1, which = -1, code = "" } = e;
    const isRightArrowClicked =
      keyCode === 39 || which === 39 || code.toLowerCase() === "arrowright";

    if (isRightArrowClicked) {
      setUpiId(predictedBank);
      setPredictionList([]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (predictionList.length > 0) {
        setHighlightIndex((prev) =>
          prev < predictionList.length - 1 ? prev + 1 : 0
        );
      }
      return;
    }
    if (key === "ArrowUp") {
      e.preventDefault();
      if (predictionList.length > 0) {
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : predictionList.length - 1
        );
      }
      return;
    }

    // Enter → choose highlighted bank
    if (key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      const selectedBank = predictionList[highlightIndex];
      const [currentUserVPA] = upiId.split("@");
      setUpiId(`${currentUserVPA}@${selectedBank}`);
    }
  }
  function handleBankNameClick(e) {
    const { target } = e;
    const currBankName = target.getAttribute("data-bank-name");
    const [currentUserVPA] = upiId.split("@");
    const updatedUpiId = `${currentUserVPA}@${currBankName}`;
    setUpiId(updatedUpiId);
    setPredictedBank(updatedUpiId);
    setPredictionList([]);
  }
  return (
    <form
      submit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.prediction}
          type="text"
          value={predictedBank}
          onChange={() => {}}
        />
        <input
          tabIndex={0}
          type="text"
          placeholder="Enter your upi id"
          value={upiId}
          onChange={handleUPIIdChange}
          autoComplete="off"
          autoCapitalize="off"
          //   pattern=".+@.+"
          onKeyDown={handleKeyDownStroke}
        />
        {predictionList.length > 0 && (
          <ul className="predictionList" tabIndex={-1}>
            {predictionList.slice(0, 5).map((prediction, index) => {
              return (
                <li
                  className={
                    index === highlightIndex ? styles.activePrediction : ""
                  }
                  key={prediction}
                  data-bank-name={prediction}
                  onClick={handleBankNameClick}
                >
                  {prediction}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button>Pay Now</button>
    </form>
  );
};

export default UPIForm;
