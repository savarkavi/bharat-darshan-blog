import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  saveDraft,
  updateBlog,
} from "../controllers/blogController.ts";
import { protect } from "../middleware/auth.ts";
import { verifiedOnly } from "../middleware/verifyEmail.ts";

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, verifiedOnly, createBlog);

router.post("/draft", protect, saveDraft);
router.put("/draft/:slug", protect, saveDraft);

router
  .route("/:slug")
  .get(getBlogBySlug)
  .put(protect, verifiedOnly, updateBlog)
  .delete(protect, verifiedOnly, deleteBlog);

export default router;
