import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  likeBlog,
  saveDraft,
} from "../controllers/blogController.ts";
import { protect } from "../middleware/auth.ts";
import { verifiedOnly } from "../middleware/verifyEmail.ts";
import { upload } from "../middleware/upload.ts";

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, verifiedOnly, createBlog);

router.put(
  "/draft/:slug",
  protect,
  verifiedOnly,
  upload.single("coverImage"),
  saveDraft
);

router
  .route("/:slug")
  .get(getBlogBySlug)
  .delete(protect, verifiedOnly, deleteBlog);

router.put("/:slug/like", protect, likeBlog);

export default router;
