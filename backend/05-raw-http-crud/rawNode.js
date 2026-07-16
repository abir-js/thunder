import http from "http";

const database = [{ name: "Abir", age: 10, email: "abir@gmail.com" }];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  } else if (req.method === "GET" && req.url === "/userinfo") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(database), null, 2);
  } else if (req.method === "POST" && req.url === "/createuser") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const user = JSON.parse(body);
      database.push(user);
      res.end(JSON.stringify({ message: "User created successfully" }));
    });
  } else if (req.method === "PATCH" && req.url === "/updateuser") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const user = JSON.parse(body);
      const findUser = database.find((u) => u.email === user.email);
      if (!findUser) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }
      Object.assign(findUser, user);
      res.end(JSON.stringify({ message: "User updated successfully" }));
    });
  } else {  
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid endpoint" }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
