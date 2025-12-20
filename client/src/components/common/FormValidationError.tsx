import type { FieldError } from "react-hook-form";
import { MdError } from "react-icons/md";
import { cn } from "../../lib/utils";

interface RequiredErrorProps {
  field: FieldError | undefined;
  errorType: string;
  message: string;
  classNames?: string;
}

const FormValidationError = ({
  field,
  errorType,
  message,
  classNames,
}: RequiredErrorProps) => {
  return (
    field?.type === errorType && (
      <div className={cn("flex items-center gap-1 text-red-500", classNames)}>
        <MdError className="size-5" />
        <p role="alert" className="text-lg text-red-600">
          {message}
        </p>
      </div>
    )
  );
};

export default FormValidationError;
