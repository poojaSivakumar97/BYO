import { useState, useEffect } from "react";

export const useDebounce = (searchVal, delay = 300) => {
  const [value, setValue] = useState(searchVal);
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(searchVal);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [searchVal, delay]);
  return value;
};
