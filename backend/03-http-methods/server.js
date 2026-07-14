const http = require("http");
const url = require("url");

const database = [{ name: "Abir", age: 10, email: "abir@gmail.com" }];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/userinfo") {
    res.end(JSON.stringify(database));
  } else if (parsedUrl.pathname === "/createuser") {
    database.push({ name: "New User", age: 20, email: "newuser@gmail.com" });
    res.end(JSON.stringify({ message: "User created successfully" }));
  } else if( parsedUrl.pathname === "/deleteuser") {
    database.pop();
    res.end(JSON.stringify({ message: "User deleted successfully" }));
  } else if (parsedUrl.pathname === "/updateuser") {
    database[0].name = "Updated User";
    res.end(JSON.stringify({ message: "User updated successfully" }));
  } else {
    res.end(JSON.stringify({ message: "Invalid endpoint" }));
  }
});

server.listen(3000, () => console.log("Server is listening"));
