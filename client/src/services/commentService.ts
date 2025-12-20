import type { Comment } from "../types/types";
import api from "./api";

interface CreateCommentParams {
  blogId: string;
  content: string;
  parent: string | null;
}

export const commentService = {
  getBlogComments: async (blogId: string) => {
    const res = await api.get<Comment[]>(`/comments/?blogId=${blogId}`);
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
