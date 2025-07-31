import React, { useState, useEffect, useRef } from "react";
import styles from "./AutoComplete.module.css";
import ResultContainer from "./ResultContainer";
import { useDebounce } from "../../custom_hooks/useDebounce";
const AutoComplete = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef(null);
  const debounceInput = useDebounce(userInput, 300);
  //   Implementing cache if we want shortlived we can manage via state or can use localStorage
  const [cache, setCache] = useState(() => {
    const value = localStorage.getItem("receipesCache");
    return value ? JSON.parse(value) : {};
  });

  useEffect(() => {
    inputRef.current?.focus();
    // return () => {
    //   localStorage.removeItem("receipesCache");
    // };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const isValidInput = validateInput();
      //   before fetching thru api check localstorage cache
      if (cache[userInput]) {
        console.log("returning from localstorge cache");
        setData(cache[userInput]);
        return;
      }
      if (!isValidInput) return;
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${debounceInput}`
      );
      const { recipes } = await response.json();
      setData(recipes);
      setCache((prevCache) => {
        const newCache = { ...prevCache, [userInput]: recipes };
        localStorage.setItem("receipesCache", JSON.stringify(newCache));
        return newCache;
      });
    }
    fetchData();
  }, [debounceInput]);

  function validateInput() {
    if (userInput == "" || !userInput.trim()) {
      return false;
    }
    return true;
  }
  return (
    <div>
      <h2>AutoComplete Search Bar</h2>
      <input
        className={styles.inputContainer}
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onBlur={() => {
          setShowResult(false);
        }}
        onFocus={() => setShowResult(true)}
      />
      {data.length > 0 && (
        <ResultContainer recipes={data} setUserInput={setUserInput} />
      )}
    </div>
  );
};

export default AutoComplete;
