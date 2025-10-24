import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blogController.ts";
import { protect } from "../middleware/auth.ts";

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, createBlog);

router
  .route("/:slug")
  .get(getBlogBySlug)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
