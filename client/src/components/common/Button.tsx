import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
}

const Button = ({ children, isLoading, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-saffron flex cursor-pointer items-center justify-center rounded-sm px-5 py-1 text-white hover:opacity-80",
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ImSpinner2 className="my-1 animate-spin" /> : children}
    </button>
  );
};

export default Button;
