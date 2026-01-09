import { type ReactNode } from "react";
import type { User } from "../types/types";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
  user: User;
}

export const AuthProvider = ({ children, user }: AuthProviderProps) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
