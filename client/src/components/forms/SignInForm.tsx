import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignIn } from "../../api/auth/queries";
import { ImSpinner2 } from "react-icons/im";

interface IFormInput {
  emailOrUsername: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit: SubmitHandler<IFormInput> = (data) => signIn(data);

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-8 rounded-lg bg-[#E9DCC9] p-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-maroon text-4xl font-bold">Welcome Back!</p>
        <p>Continue your journey through ancient wisdom</p>
      </div>
      <div className="bg-copper-brown h-px w-full" />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="emailOrUsername"
            className="text-maroon text-xl font-semibold"
          >
            Email / Username
          </label>
          <input
            {...register("emailOrUsername", { required: true })}
            id="emailOrUsername"
            className="rounded-lg border p-2 outline-none"
            placeholder="Enter your email address or username"
          />
          {errors.emailOrUsername?.type === "required" && (
            <p role="alert" className="text-red-600">
              Email or Username is required
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-maroon text-xl font-semibold"
          >
            Password
          </label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            id="password"
            className="rounded-lg border p-2 outline-none"
            placeholder="Enter your password"
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-600">
              Password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert" className="text-red-600">
              Password should be atleast 6 characters long
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="text-lg">
              Remember me
            </label>
          </div>
          <p className="text-maroon cursor-pointer text-lg">Forgot password?</p>
        </div>
        <Button className="flex py-2 text-lg">
          {isPending ? <ImSpinner2 className="my-1 animate-spin" /> : "Sign In"}
        </Button>
      </form>
      <div className="bg-copper-brown h-px w-full" />
      <p className="text-center text-lg">
        New to our community?{" "}
        <Link to={"/sign-up"} className="text-maroon font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
