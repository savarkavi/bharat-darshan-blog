import type { Request, Response } from "express";
import { ask } from "../services/perplexityService.ts";
import Blog from "../models/Blog.ts";

export const askPerplexity = async (req: Request, res: Response) => {
  try {
    const { query, blogSlug } = req.body;

    if (!blogSlug || !query) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const blog = await Blog.findOne({ slug: blogSlug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = await ask(query);

    let fullAnswer = "";
    let searchResults: any[] = [];
    let citations: string[] = [];

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        res.write(content);

        fullAnswer += content;
      }

      if (chunk.search_results) {
        searchResults = chunk.search_results;
      }

      if (chunk.citations) {
        citations = chunk.citations;
      }
    }

    if (fullAnswer) {
      blog.researchResults.push({
        query,
        research: {
          content: fullAnswer,
          search_results: searchResults,
          citations,
        },
      });

      await blog.save();
    }

    res.end();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Perplexity research failed. Try again later." });
  }
};
