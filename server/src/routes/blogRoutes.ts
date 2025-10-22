import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blogController.ts";

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog);

router.route("/:slug").get(getBlogBySlug).put(updateBlog).delete(deleteBlog);

export default router;
