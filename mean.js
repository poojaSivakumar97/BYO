function mean(array) {
  let sum = array.reduce((acc, val) => (acc = acc + val), 0);
  let n = array.length;

  return sum / n;
}
console.log(mean([2, 2, 3, 47, 5]));
