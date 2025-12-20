import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentService } from "../../services/commentService";
import type { Comment } from "../../types/types";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/global";

export const useGetBlogComments = (blogId: string) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => commentService.getBlogComments(blogId),
  });
};

export const useGetCommentReplies = (parentId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["replies", parentId],
    queryFn: () => commentService.getReplies(parentId),
    enabled,
  });
};

export const useCreateComment = (blogId: string) => {
  const incrementRepliesCount = (
    comments: Comment[] | undefined,
    parentId: string,
  ) => {
    if (!comments) return comments;

    return comments.map((comment) =>
      comment._id === parentId
        ? { ...comment, repliesCount: comment.repliesCount + 1 }
        : comment,
    );
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentService.createComment,
    onSuccess: (newComment: Comment) => {
      toast.success("Comment posted");

      if (newComment.parent) {
        queryClient.setQueryData(
          ["replies", newComment.parent],
          (oldReplies: Comment[] | undefined) => {
            return oldReplies ? [newComment, ...oldReplies] : [newComment];
          },
        );

        queryClient.setQueryData(
          ["comments", blogId],
          (oldComments: Comment[]) => {
            incrementRepliesCount(oldComments, newComment.parent);
          },
        );

        queryClient
          .getQueryCache()
          .findAll({ queryKey: ["replies"] })
          .forEach((query) => {
            queryClient.setQueryData(
              query.queryKey,
              (oldReplies: Comment[] | undefined) =>
                incrementRepliesCount(oldReplies, newComment.parent),
            );
          });

        return;
      }

      queryClient.setQueryData(
        ["comments", blogId],
        (oldComments: Comment[] | undefined) => {
          return oldComments ? [newComment, ...oldComments] : [newComment];
        },
      );
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};
