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
    const slug = req.params.slug;

    const blog = await Blog.findOne({ slug }).populate(
      "author",
      "fullname username avatar"
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
    const { title, excerpt, content, coverImage, tags, category } = req.body;
    const slug = generateSlug(title);

    const newBlog = await Blog.create({
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
    const slug = req.params.slug;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content, excerpt, tags, category, coverImage, status } =
      req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;
    blog.coverImage = coverImage || blog.coverImage;
    blog.status = status || blog.status;

    if (title && title !== blog.title) {
      blog.slug = generateSlug(title);
    }

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
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

    let blog;

    if (slug) {
      blog = await Blog.findOne({ slug });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
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
    } else {
      blog = new Blog({
        title,
        content: JSON.parse(content),
        excerpt,
        tags: JSON.parse(tags),
        category,
        coverImage,
        author: req.user?._id,
        slug: generateSlug(title),
      });
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
