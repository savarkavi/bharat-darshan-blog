import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignUp } from "../../api/auth/authApi";
import FormValidationError from "../common/FormValidationError";

interface IFormInput {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit: SubmitHandler<IFormInput> = (data) => signUp(data);

  return (
    <div className="mt-14 flex w-full max-w-[500px] flex-col gap-8 rounded-lg bg-[#E9DCC9] p-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-maroon text-4xl font-bold">Join our community</p>
        <p>Begin your journey through the wisdom of ages</p>
      </div>
      <div className="bg-copper-brown h-px w-full" />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullname"
            className="text-maroon text-xl font-semibold"
          >
            Fullname
          </label>
          <input
            {...register("fullname", { required: true })}
            id="fullname"
            className="rounded-lg border p-2 outline-none"
            placeholder="Enter your fullname"
          />
          <FormValidationError
            field={errors.fullname}
            errorType="required"
            message="Fullname is required"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-maroon text-xl font-semibold">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            id="email"
            className="rounded-lg border p-2 outline-none"
            placeholder="Enter your email address"
          />
          <FormValidationError
            field={errors.email}
            errorType="required"
            message="Email is required"
          />
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
            type="password"
            className="rounded-lg border p-2 outline-none"
            placeholder="Enter your password"
          />
          <FormValidationError
            field={errors.password}
            errorType="required"
            message="Password is required"
          />
          <FormValidationError
            field={errors.password}
            errorType="minLength"
            message="Password should be atleast 6 characters long"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <input type="checkbox" id="remember-me" className="mt-1" />
            <label htmlFor="remember-me" className="text-lg leading-tight">
              I agree to the terms and conditions and wish to receive the latest
              updates.
            </label>
          </div>
        </div>
        <Button isLoading={isPending} className="flex py-2 text-lg">
          Sign In
        </Button>
      </form>
      <div className="bg-copper-brown h-px w-full" />
      <p className="text-center text-lg">
        Already a member?{" "}
        <Link to={"/sign-up"} className="text-maroon font-semibold">
          Sign In here
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
