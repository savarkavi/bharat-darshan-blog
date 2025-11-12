import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/global";
import { useNavigate } from "react-router-dom";

export const useAuthUser = () => {
  const query = useQuery({
    queryKey: ["auth", "user"],
    queryFn: authService.fetchAuthUser,
    retry: false,
    staleTime: Infinity,
  });

  const user = query.data;
  const isAuthenticated = !!user;

  return { user, isAuthenticated, isLoading: query.isLoading };
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data);
      navigate("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data);
    },
  });
};
