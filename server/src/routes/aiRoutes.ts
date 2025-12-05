import express from "express";
import { askPerplexity } from "../controllers/aiController.ts";
import { protect } from "../middleware/auth.ts";
import { verifiedOnly } from "../middleware/verifyEmail.ts";

const router = express.Router();

router.put("/ask-perplexity", protect, verifiedOnly, askPerplexity);

export default router;
