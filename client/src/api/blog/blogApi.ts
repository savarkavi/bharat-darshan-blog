import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { blogService } from "../../services/blogService";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/global";
import { useNavigate, useParams } from "react-router-dom";
import type { GetBlogBySlugData } from "../../types/types";

export const useGetBlog = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBlog(slug),
    enabled: !!slug,
  });
};

export const useGetAllBlogs = () => {
  return useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam }) => blogService.getAllBlogs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
    staleTime: Infinity,
  });
};

export const useGetMyBlogs = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["my-blogs", userId],
    queryFn: ({ pageParam }) => blogService.getMyBlogs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
    staleTime: Infinity,
  });
};

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: async (data) => {
      const slug = data.slug;

      await queryClient.cancelQueries({ queryKey: ["blog", slug] });

      queryClient.setQueryData(["blog", slug], data);

      navigate(`/editor/${slug}`, { replace: true });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};

export const useSaveDraft = () => {
  const navigate = useNavigate();
  const { slug: currentSlug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.saveDraft,
    onSuccess: async (data) => {
      const slug = data.slug;

      await queryClient.cancelQueries({ queryKey: ["blog", slug] });

      queryClient.setQueryData(["blog", slug], data);

      toast.success("Draft saved");

      if (slug !== currentSlug) {
        navigate(`/editor/${slug}`, { replace: true });
      }
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};

export const useLikeBlog = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => blogService.likeBlog(slug),
    onMutate: async ({ userId }: { userId: string }) => {
      await queryClient.cancelQueries({ queryKey: ["blog", slug] });

      const previousData = queryClient.getQueryData<GetBlogBySlugData>([
        "blog",
        slug,
      ]);

      queryClient.setQueryData<GetBlogBySlugData>(["blog", slug], (oldData) => {
        if (!oldData) return oldData;

        const isLiked = oldData.blog.likes.find((id) => id === userId);

        return {
          ...oldData,
          blog: {
            ...oldData.blog,
            likes: isLiked
              ? oldData.blog.likes.filter((id) => id !== userId)
              : [...oldData.blog.likes, userId],
          },
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["blog", slug], context?.previousData);
    },
  });
};
