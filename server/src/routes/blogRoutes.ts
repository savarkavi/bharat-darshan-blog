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
import { upload } from "../middleware/upload.ts";

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, verifiedOnly, createBlog);

router.post("/draft", protect, upload.single("coverImage"), saveDraft);
router.put("/draft/:slug", protect, upload.single("coverImage"), saveDraft);

router
  .route("/:slug")
  .get(getBlogBySlug)
  .put(protect, verifiedOnly, upload.single("coverImage"), updateBlog)
  .delete(protect, verifiedOnly, deleteBlog);

export default router;
