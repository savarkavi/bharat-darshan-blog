import { ImSpinner2 } from "react-icons/im";
import { useCreateBlog } from "../api/blog/blogApi";
import Button from "./common/Button";

const NewEssayButton = () => {
  const { mutate, isPending } = useCreateBlog();

  return (
    <Button className="w-28" onClick={() => mutate()}>
      {isPending ? <ImSpinner2 className="my-1 animate-spin" /> : "New Essay"}
    </Button>
  );
};

export default NewEssayButton;
