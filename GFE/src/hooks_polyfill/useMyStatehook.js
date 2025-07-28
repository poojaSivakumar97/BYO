let initialValue;
function useMyStatehook(value) {
  initialValue = initialValue || value;

  function setValue(newValue) {
    initialValue = newValue;
  }
  return [initialValue, setValue];
}

export default useMyStatehook;
