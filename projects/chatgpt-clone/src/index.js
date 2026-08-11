import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./router/user.router.js";
import messageRouter from "./router/message.router.js";
import chatRouter from "./router/chat.router.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chats", chatRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
