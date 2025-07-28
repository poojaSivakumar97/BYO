import React, { useRef, useEffect } from "react";

const Input = ({ fileName, setFileName, setAddNode, handleAddNode }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function handleKeyDown(e) {
    if (e.key == "Escape") {
      setFileName("");
      setAddNode(false);
    }
    if (e.key == "Enter" || e.key == "Tab") {
      // update value
      handleAddNode(fileName);
      setFileName("");
      setAddNode(false);
    }
  }
  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Input;
