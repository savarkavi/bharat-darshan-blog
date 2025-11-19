import axios from "axios";
import api from "./api";

interface SignInDataType {
  emailOrUsername: string;
  password: string;
}

interface SignUpDataType {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const authService = {
  signIn: async (data: SignInDataType) => {
    const res = await api.post("/auth/sign-in", data);
    return res.data;
  },

  signUp: async (data: SignUpDataType) => {
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
