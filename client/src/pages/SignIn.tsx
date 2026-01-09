import { Navigate } from "react-router-dom";
import SignInForm from "../components/forms/SignInForm";
import { useAuthUser } from "../api/auth/authApi";

const SignIn = () => {
  const { user } = useAuthUser();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="bg-light-parchment flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default SignIn;
