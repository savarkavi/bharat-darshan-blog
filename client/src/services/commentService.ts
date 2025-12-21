import type { Comment, GetBlogComments } from "../types/types";
import api from "./api";

interface CreateCommentParams {
  blogId: string;
  content: string;
  parent: string | null;
}

interface GetBlogCommentsParams {
  blogId: string;
  pageParam: number;
  limit: number;
}

export const commentService = {
  getBlogComments: async ({
    blogId,
    pageParam,
    limit,
  }: GetBlogCommentsParams) => {
    const res = await api.get<GetBlogComments>(
      `/comments/?blogId=${blogId}&page=${pageParam}&limit=${limit}`,
    );
    return res.data;
  },

  getReplies: async (parentId: string) => {
    const res = await api.get<Comment[]>(
      `/comments/get-replies/?parentId=${parentId}`,
    );
    return res.data;
  },

  createComment: async ({ blogId, content, parent }: CreateCommentParams) => {
    const res = await api.post<Comment>("/comments", {
      blogId,
      content,
      parent,
    });
    return res.data;
  },
};
