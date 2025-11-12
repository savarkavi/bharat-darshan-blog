import { Navigate } from "react-router-dom";
import { useAuthUser } from "../api/auth/queries";
import SignUpForm from "../components/forms/SignUpForm";

const SignUp = () => {
  const { isAuthenticated } = useAuthUser();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="bg-light-parchment flex min-h-screen items-center justify-center border border-black">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
