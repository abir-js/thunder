// const http = require("http");

// const server = http.createServer((req, res) => {});

// server.listen(3000, () => console.log("Server is listening"));


const validator = require("validator");

const email = "abir@gmail.com"
const pass = "Abir@123"

console.log(validator.isStrongPassword(pass));