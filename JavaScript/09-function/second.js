// function second() {
//   console.log("second");
// }

// function first(callback) {
//   console.log("first");
//   callback();
//   console.log("third");
// }

// first(second);

function zomatoFn() {
  console.log("Zomato is processing your order");
}


function swiggyFn() {
  console.log("Swiggy is processing your order");
}


function payment(amount, callback) {
  console.log(amount, " Payment is happening");
  callback();
}

payment(150, zomatoFn);

