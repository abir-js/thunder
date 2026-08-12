import { Router } from "express";
import {
  loginController,
  logoutController,
  profileController,
  signupController,
} from "../controller/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, profileController);
router.post("/logout", authMiddleware, logoutController);

export default router;
