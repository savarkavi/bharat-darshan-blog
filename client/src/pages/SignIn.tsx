import { Navigate } from "react-router-dom";
import SignInForm from "../components/forms/SignInForm";
import { useAuthUser } from "../api/auth/queries";

const SignIn = () => {
  const { isAuthenticated } = useAuthUser();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="bg-light-parchment flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default SignIn;
