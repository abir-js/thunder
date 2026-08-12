import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model.js";

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findById(decoded.userId);
    if (!existingUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = existingUser;

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
