/**
 * useCounter hook returns an object with the following properties:
 *
 * getCount: () => number - Returns the current counter value
 * increment: () => void - Increments the counter value
 * decrement: () => void - Decrements the counter value
 * reset: () => void - Resets the counter value to initialValue (or 0 if not provided)
 * setCount: (value: number) => void - Sets the counter value to the given value
 *
 * @param {number} initialValue - The initial value for the counter
 * @returns {{ getCount: () => number, increment: () => void, decrement: () => void, reset: () => void, setCount: (value: number) => void }}
 */
function useCounter(initialValue = 0) {
  let count = initialValue;
  function increment() {
    count++;
  }
  function decrement() {
    count--;
  }
  function reset() {
    count = initialValue;
  }
  function setCount(value) {
    count = value;
  }
  function getCount() {
    return count;
  }
  return {
    getCount,
    increment,
    decrement,
    reset,
    setCount,
  };
}

const counter = useCounter(0);
console.log(counter.getCount()); // 0
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
