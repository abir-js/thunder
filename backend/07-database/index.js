import express from "express";
import fs from "fs";

const app = express();

const DBPath = "./db.txt";

function readDB() {
  const data = fs.readFileSync(DBPath, "utf-8");
  return JSON.parse(data);
}

app.use(express.json());

app.get("/user/:accountNumber", (req, res) => {
  const accountNumber = req.params.accountNumber;

  res.json(user);
});

app.post("/user", (req, res) => {
  const user = req.body;

  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
