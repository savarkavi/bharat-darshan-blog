import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { commentService } from "../../services/commentService";
import type { Comment, GetBlogComments } from "../../types/types";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/global";

export const useGetBlogComments = ({
  blogId,
  limit,
}: {
  blogId: string;
  limit: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments", blogId],
    queryFn: ({ pageParam }) =>
      commentService.getBlogComments({ blogId, pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
    staleTime: Infinity,
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

        queryClient.setQueryData<InfiniteData<GetBlogComments>>(
          ["comments", blogId],
          (oldComments) => {
            if (!oldComments) return oldComments;

            return {
              ...oldComments,
              pages: oldComments.pages.map((page) => ({
                ...page,
                comments: page.comments.map((comment) =>
                  comment._id === newComment.parent
                    ? { ...comment, repliesCount: comment.repliesCount + 1 }
                    : comment,
                ),
              })),
            };
          },
        );

        queryClient
          .getQueryCache()
          .findAll({ queryKey: ["replies"] })
          .forEach((query) => {
            queryClient.setQueryData(
              query.queryKey,
              (oldReplies: Comment[] | undefined) => {
                if (!oldReplies) return oldReplies;

                return oldReplies.map((reply) =>
                  reply._id === newComment.parent
                    ? { ...reply, repliesCount: reply.repliesCount + 1 }
                    : reply,
                );
              },
            );
          });

        return;
      }

      queryClient.setQueryData<InfiniteData<GetBlogComments>>(
        ["comments", blogId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, i) =>
              i === 0
                ? { ...page, comments: [newComment, ...page.comments] }
                : page,
            ),
          };
        },
      );
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};
