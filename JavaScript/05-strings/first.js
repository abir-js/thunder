let str1 = "Abir Bhattacharjee";
let str2 = "Abir Bhattacharjee";

let str3 = `
This can be written in multiple lines
`;

console.log(str3.length);

console.log(str1[0]);

for (let i = 0; i < str1.length; i++) {
  console.log(str1[i]);
}

let str = `sample string`;
console.log(str.toLowerCase());
console.log(str.toUpperCase());

console.log(str.includes("str"));
console.log(str.startsWith("sample"));
console.log(str.endsWith("string"));

console.log(str.repeat(3));

console.log(str.substring(0, 5));
console.log(str.slice(0, 5));

console.log(str.split(" "));

console.log(str.charAt(0));
console.log(str.charCodeAt(0));
console.log(String.fromCharCode(65));

console.log(str.indexOf("str"));
console.log(str.lastIndexOf("str"));

console.log(str.replace("str", "string"));

console.log(str.trim());
