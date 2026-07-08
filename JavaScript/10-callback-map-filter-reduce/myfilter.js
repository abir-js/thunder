const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.myfilter = function (callback) {
  const ans = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      ans.push(this[i]);
    }
  }
  return ans;
};

const newArr = arr.myfilter((item) => item > 5);

console.log(newArr);
