import express from "express";
import { protect } from "../middleware/auth.ts";
import {
  createComment,
  getComments,
} from "../controllers/commentController.ts";

const router = express.Router();

router.route("/").get(getComments).post(protect, createComment);

export default router;
