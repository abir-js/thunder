

const s1 = new Set([10, 12, 17, 10, 12, 17, 20, 30, 40, 50]);

// set on objects 

const s2 = new Set([{ name: "John" }, { name: "John" }, { name: "Doe" }]);

// solution for set on objects so that it can be unique

const s3 = new Set(
  [{ name: "John" }, { name: "John" }, { name: "Doe" }].map((item) =>
    JSON.stringify(item)
  )
);
// here we are using JSON.stringify to convert the objects into strings, which allows the Set to treat them as unique values based on their string representation.


const s4 = new Set()

s4.add(10);
s4.add(20);
s4.add(30);
s4.add(10); // duplicate value, will not be added

console.log(s4.has(20)); // true


console.log(s1);
console.log(s2);
console.log(s3);
console.log(s4);
