import { useForm, type SubmitHandler } from "react-hook-form";
import FormValidationError from "../common/FormValidationError";
import Button from "../common/Button";
import { useCreateComment } from "../../api/comment/commentApi";
import Avatar from "react-avatar";
import { useAuthUser } from "../../api/auth/authApi";

interface IFormInput {
  content: string;
}

interface CommentFormProps {
  blogId: string;
  parentCommentId: string | null;
}

const CommentForm = ({ blogId, parentCommentId }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const { user } = useAuthUser();

  const { mutate: postComment, isPending } = useCreateComment(blogId);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    postComment({ blogId, content: data.content, parent: parentCommentId });
    reset();
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar
        name={user?.fullname}
        src={user?.avatar}
        round
        size="40px"
        textMarginRatio={0.15}
        className="cursor-pointer hover:brightness-105"
      />
      <form
        className="relative flex w-full flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register("content", { required: true })}
          placeholder="Write a comment..."
          rows={4}
          className="border-ash-grey w-full rounded-xl border px-4 py-2 placeholder:text-xl"
        />
        <FormValidationError
          field={errors.content}
          errorType="required"
          message="Required!"
          classNames="absolute left-0 bottom-0"
        />
        <Button isLoading={isPending} className="w-20 self-end">
          Post
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
