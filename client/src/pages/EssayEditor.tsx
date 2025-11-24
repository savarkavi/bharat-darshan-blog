import { useNavigate, useParams } from "react-router-dom";
import { useGetBlog } from "../api/blog/blogApi";
import EssayForm from "../components/forms/EssayForm";
import TiptapEditor from "../components/TipTapEditor";
import { ImSpinner2 } from "react-icons/im";

const EssayEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBlog(slug);

  if (!data) {
    navigate("/editor");
  }

  if (isLoading)
    return (
      <div className="bg-light-parchment relative flex min-h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );

  return (
    <div className="bg-light-parchment relative flex min-h-screen">
      <EssayForm data={data} />
      <TiptapEditor data={data} />
    </div>
  );
};

export default EssayEditor;
