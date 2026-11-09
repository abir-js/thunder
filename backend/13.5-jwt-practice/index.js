import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

await connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1); // Exit the process with an error code
});
