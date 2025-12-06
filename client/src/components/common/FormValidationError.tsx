import type { FieldError } from "react-hook-form";
import { MdError } from "react-icons/md";

interface RequiredErrorProps {
  field: FieldError | undefined;
  errorType: string;
  message: string;
}

const FormValidationError = ({
  field,
  errorType,
  message,
}: RequiredErrorProps) => {
  return (
    field?.type === errorType && (
      <div className="flex items-center gap-1 text-red-500">
        <MdError className="size-5" />
        <p role="alert" className="text-lg text-red-600">
          {message}
        </p>
      </div>
    )
  );
};

export default FormValidationError;
