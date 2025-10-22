import type { Request, Response } from "express";
import Blog from "../models/Blog.ts";
import { generateSlug } from "../utils/generateSlug.ts";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().populate(
      "author",
      "fullname username avatar"
    );

    res.json(blogs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, coverImage, tags, category } = req.body;
    const slug = generateSlug(title);

    const newBlog = Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      category,
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

export const updateBlog = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
