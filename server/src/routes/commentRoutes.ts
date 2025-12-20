import express from "express";
import { protect } from "../middleware/auth.ts";
import {
  createComment,
  getComments,
  getReplies,
} from "../controllers/commentController.ts";

const router = express.Router();

router.route("/").get(getComments).post(protect, createComment);
router.get("/get-replies", getReplies);

export default router;
