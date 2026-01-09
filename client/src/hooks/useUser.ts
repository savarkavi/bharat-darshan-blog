import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useUser = () => {
  const user = useContext(AuthContext);

  if (!user) {
    throw new Error("useUser must be used within a ProtectedRoute");
  }

  return user;
};
