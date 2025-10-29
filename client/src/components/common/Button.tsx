import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={`bg-saffron cursor-pointer rounded-sm px-5 py-1 text-white hover:opacity-80 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
