import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/useAuth";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: authService.fetchAuthUser,
    retry: false,
    staleTime: Infinity,
  });
};

export const useSignIn = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(["auth", "user"], data);
    },
  });
};

export const useSignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(["auth", "user"], data);
    },
  });
};
