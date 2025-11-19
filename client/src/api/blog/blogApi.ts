import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogService } from "../../services/blogService";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/global";
import { useNavigate, useParams } from "react-router-dom";
import type { Blog } from "../../types/types";

export const useGetBlog = (slug: string | undefined) => {
  return useQuery<Blog>({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBlog(slug),
    enabled: !!slug,
  });
};

export const useSaveDraft = () => {
  const navigate = useNavigate();
  const { slug: currentSlug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.saveDraft,
    onSuccess: (data) => {
      const slug = data.slug;

      queryClient.setQueryData(["blog", slug], data);

      toast.success("Draft saved");

      if (slug === currentSlug) return;
      navigate(`/editor/${slug}`, { replace: true });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};
