import { useCreateBlog } from "../api/blog/blogApi";
import Button from "./common/Button";

const NewEssayButton = () => {
  const { mutate, isPending } = useCreateBlog();

  return (
    <Button isLoading={isPending} className="w-28" onClick={() => mutate()}>
      New Essay
    </Button>
  );
};

export default NewEssayButton;
