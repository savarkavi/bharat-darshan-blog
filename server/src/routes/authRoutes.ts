import express from "express";
import {
  resendVerification,
  signIn,
  signUp,
  verifyEmail,
} from "../controllers/authController.ts";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);

export default router;
