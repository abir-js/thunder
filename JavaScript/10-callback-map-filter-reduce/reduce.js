

const arr = [10, 20, 30, 40, 50];

// accumulator := the value that is returned after each iteration of the callback function
// currentValue := the current element being processed in the array
const sum = arr.reduce((acc, curr) => acc + curr, 0);

const product = arr.reduce((acc, curr) => acc * curr, 1);

Array.prototype.myreduce = function (callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i]);
  }
  return accumulator;
};

const mySum = arr.myreduce((acc, curr) => acc + curr, 0);
const myProduct = arr.myreduce((acc, curr) => acc * curr, 1);

console.log(mySum);
console.log(myProduct);

console.log(sum);
console.log(product);