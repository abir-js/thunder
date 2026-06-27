const arr = [10, 20, 50, 40, 80, 70];



Array.prototype.mySort = function (callback) {
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this.length - 1; j++) {
      if (callback(this[j], this[j + 1])) {
        let temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
};

arr.mySort((a, b) => a > b);
console.log(arr);
