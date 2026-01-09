import { Navigate } from "react-router-dom";
import { useAuthUser } from "../api/auth/authApi";
import SignUpForm from "../components/forms/SignUpForm";

const SignUp = () => {
  const { user } = useAuthUser();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="bg-light-parchment flex min-h-screen items-center justify-center border border-black">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
