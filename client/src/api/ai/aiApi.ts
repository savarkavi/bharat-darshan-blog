import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiService } from "../../services/aiService";
import { toast } from "react-toastify";

export const useAskPerplexity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiService.askPerplexity,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["blog", variables.blogSlug],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Streaming failed");
    },
  });
};
