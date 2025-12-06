import { useMutation } from "@tanstack/react-query";
import { aiService } from "../../services/aiService";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/global";
import { toast } from "react-toastify";

export const useAskPerplexity = () => {
  return useMutation({
    mutationFn: aiService.askPerplexity,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};
