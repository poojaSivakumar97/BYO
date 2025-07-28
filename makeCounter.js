function makeCounter(initialValue = 0) {
  let count = initialValue;

  function increment() {
    const curr = count;
    count++;
    return curr;
  }

  return increment;
}

const counter = makeCounter(0);
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
