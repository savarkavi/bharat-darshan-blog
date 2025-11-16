import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-saffron flex cursor-pointer items-center justify-center rounded-sm px-5 py-1 text-white hover:opacity-80",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
