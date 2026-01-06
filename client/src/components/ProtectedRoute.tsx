import { useAuthUser } from "../api/auth/authApi";
import { ImSpinner2 } from "react-icons/im";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="bg-light-parchment flex h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
