import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blogController.ts";
import { protect } from "../middleware/auth.ts";
import { verifiedOnly } from "../middleware/verifyEmail.ts";

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, verifiedOnly, createBlog);

router
  .route("/:slug")
  .get(getBlogBySlug)
  .put(protect, verifiedOnly, updateBlog)
  .delete(protect, verifiedOnly, deleteBlog);

export default router;
