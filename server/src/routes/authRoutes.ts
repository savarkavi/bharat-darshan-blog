import express from "express";
import {
  getAuthUser,
  resendVerification,
  signIn,
  signUp,
  verifyEmail,
} from "../controllers/authController.ts";
import { protect } from "../middleware/auth.ts";

const router = express.Router();

router.get("/me", protect, getAuthUser);
router.get("/verify-email", verifyEmail);

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/resend-verification", protect, resendVerification);

export default router;
