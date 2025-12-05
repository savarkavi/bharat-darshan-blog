import type { Request, Response } from "express";
import { ask } from "../services/perplexityService.ts";
import Blog from "../models/Blog.ts";

export const askPerplexity = async (req: Request, res: Response) => {
  try {
    const { query, blogSlug } = req.body;

    if (!blogSlug) {
      return res.status(400).json({ message: "Invalid slug" });
    }

    const blog = await Blog.findOne({ slug: blogSlug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!query) {
      return res.status(400).json({ message: "Undefined query" });
    }

    const data = await ask(query);

    blog.researchResults.push({
      query,
      research: data,
    });

    await blog.save();

    return res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Perplexity research failed. Try again later." });
  }
};
