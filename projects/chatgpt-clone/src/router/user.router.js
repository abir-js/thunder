import { Router } from "express";


const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/profile", authMiddleware, profileController);
router.post("/logout", authMiddleware, logoutController);

export default router;