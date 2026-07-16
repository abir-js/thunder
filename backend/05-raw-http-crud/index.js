import express from "express";

const app = express();

// middlewares
app.use(express.json());

const database = [];

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/userinfo", (req, res) => {
  res.send("Hello");
});

app.post("/createuser", (req, res) => {
  res.send("Post user");
});

app.listen(3000, () => console.log("Listening at port 3000"));
