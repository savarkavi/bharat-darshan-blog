import type { Request, Response } from "express";
import Blog from "../models/Blog.ts";
import { generateSlug } from "../utils/generateSlug.ts";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ status: "published" })
      .populate("author", "_id fullname username avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();
    const hasMore = skip + blogs.length < totalBlogs;

    res.json({
      blogs,
      currentPage: page,
      hasMore,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const blog = await Blog.findOne({ slug }).populate(
      "author",
      "_id fullname username avatar"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const slug = generateSlug("Untitled");

    const newBlog = await Blog.create({
      title: "Untitled",
      slug,
      author: req.user?._id,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const saveDraft = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { title, content, excerpt, tags, category } = req.body;
    const coverImage = req.file ? req.file.path : req.body.coverImage;

    if (!slug) {
      return res.status(400).json({ message: "Invalid slug" });
    }

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    blog.title = title;
    blog.content = JSON.parse(content);
    blog.excerpt = excerpt;
    blog.tags = JSON.parse(tags);
    blog.category = category;
    blog.coverImage = coverImage;

    if (title && title !== blog.title) {
      blog.slug = generateSlug(title);
    }

    const savedDraft = await blog.save();

    return res.status(200).json(savedDraft);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();

    res.status(204).json({ message: "Blog successfully deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
