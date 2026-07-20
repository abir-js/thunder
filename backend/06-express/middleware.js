import express from "express";

const app = express();

app.use("/product", (req, res, next) => {
  res.send("Hello there");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
