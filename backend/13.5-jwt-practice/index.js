import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
const app = express()
const port = process.env.PORT || 8000;

app.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
})