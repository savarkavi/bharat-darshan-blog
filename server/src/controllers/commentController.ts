import type { Request, Response } from "express";
import Blog from "../models/Blog.ts";
import Comment from "../models/Comment.ts";
import mongoose from "mongoose";

export const getComments = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;

    if (!blogId) {
      return res.status(400).json({ message: "Invalid blog Id" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comments = await Comment.aggregate([
      {
        $match: {
          blog: new mongoose.Types.ObjectId(blogId as string),
          parent: null,
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$parent", "$$commentId"] },
              },
            },
            { $count: "count" },
          ],
          as: "repliesMeta",
        },
      },
      {
        $addFields: {
          repliesCount: {
            $ifNull: [{ $arrayElemAt: ["$repliesMeta.count", 0] }, 0],
          },
        },
      },
      {
        $project: {
          repliesMeta: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    await Comment.populate(comments, {
      path: "author",
      select: "_id fullname username avatar",
    });

    const totalComments = await Comment.countDocuments({
      blog: blogId,
      parent: null,
    });
    const hasMore = skip + comments.length < totalComments;

    return res.status(200).json({ comments, currentPage: page, hasMore });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { blogId, content, parent } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (parent) {
      const parentComment = await Comment.findById(parent);

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    const comment = await Comment.create({
      blog: blogId,
      author: req.user._id,
      content,
      parent,
    });

    const populatedComment = await comment.populate(
      "author",
      "_id fullname username avatar"
    );

    return res.status(200).json(populatedComment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { parentId } = req.query;

    if (!parentId) {
      return res.status(400).json({ message: "Invalid parent Id" });
    }

    const parentComment = await Comment.findById(parentId);

    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const replies = await Comment.aggregate([
      {
        $match: {
          parent: new mongoose.Types.ObjectId(parentId as string),
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$parent", "$$commentId"] },
              },
            },
            { $count: "count" },
          ],
          as: "repliesMeta",
        },
      },
      {
        $addFields: {
          repliesCount: {
            $ifNull: [{ $arrayElemAt: ["$repliesMeta.count", 0] }, 0],
          },
        },
      },
      {
        $project: {
          repliesMeta: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    await Comment.populate(replies, {
      path: "author",
      select: "_id fullname username avatar",
    });

    return res.status(200).json(replies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
