import api from "./api";

export const authService = {
  signIn: async (data: { emailOrUsername: string; password: string }) => {
    const res = await api.post("/auth/sign-in", data);
    return res.data;
  },

  signUp: async (data: {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post("/auth/sign-up", data);
    return res.data;
  },

  fetchAuthUser: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};
