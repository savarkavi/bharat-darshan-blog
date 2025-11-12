import axios from "axios";
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

  signOut: async () => {
    await api.post("/auth/sign-out");
  },

  fetchAuthUser: async () => {
    try {
      const res = await api.get("/auth/me");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        return null;
      }
      throw error;
    }
  },
};
