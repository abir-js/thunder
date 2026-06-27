function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function calculator(num1, num2, callback) {
  console.log("Initializing calculator");

  console.log("Your result is ", callback(num1, num2));
}

// calculator(5, 2, mul);
calculator(5, 2, (a, b) => a / b);
