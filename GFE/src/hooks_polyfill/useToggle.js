import React from "react";
export function useToggle(initialValue) {
  let state = initialValue;
  const [value, setValue] = React.useState(state);
  function toggle() {
    setValue((preValue) => !preValue);
  }
  function setTrue() {
    setValue(true);
  }
  function setFalse() {
    setValue(false);
  }
  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}
