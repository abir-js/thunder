import { Router } from "express";
import {
  loginController,
  logoutController,
  profileController,
  signupController,
} from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, profileController);
router.post("/logout", authMiddleware, logoutController);

export default router;
