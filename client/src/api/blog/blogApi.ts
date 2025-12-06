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
import { useNavigate } from "react-router-dom";

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

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (data) => {
      const slug = data.slug;

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.saveDraft,
    onSuccess: (data) => {
      const slug = data.slug;

      queryClient.setQueryData(["blog", slug], data);

      toast.success("Draft saved");
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};
