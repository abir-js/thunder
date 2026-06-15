const marks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// console.log("length: " + marks.length);

// console.log(marks.push(60, 70, 80, 90, 100));
// console.log(marks);
// console.log(marks.pop());

const marks1 = marks.slice(1, 4);
// console.log(marks1);
const marks2 = marks.splice(1, 4);
// console.log(marks2);
// console.log(marks);

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 10];

// const newArr = arr1.concat(arr2);
const newArr = [...arr1, ...arr2];
// console.log(newArr);

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [first, second, ...rest] = num;
console.log(first);
console.log(second);
console.log(rest);

// join - convert array to string
const str = num.join(", ");
console.log(str);

// split - convert string to array
const str2 = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
const arr3 = str2.split(", ");
console.log(arr3);
