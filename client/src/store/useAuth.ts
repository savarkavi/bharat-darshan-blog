import { create } from "zustand";

export interface IUser {
  userId: string;
  fullname: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthStoreState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  get isAuthenticated() {
    return get().user !== null;
  },
}));
