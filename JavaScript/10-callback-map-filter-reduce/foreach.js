const arr = [10, 20, 50, 40, 80, 70];

// arr.forEach((item, index, array) => {
//   console.log(item, "is at index ", index, array);
// });

Array.prototype.myForeach = function (callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(this[i], i, this);
  }
};

arr.myForeach((item, index, array) => {
  console.log(item, "is at index ", index, array);
});
