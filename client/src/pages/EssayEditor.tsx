import { useNavigate, useParams } from "react-router-dom";
import { useGetBlog } from "../api/blog/blogApi";
import EssayForm from "../components/forms/EssayForm";
import TiptapEditor from "../components/TipTapEditor";
import { ImSpinner2 } from "react-icons/im";
import EditorAICompanion from "../components/EditorAICompanion";

const EssayEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBlog(slug);

  if (!slug || !data) {
    navigate("/");
    return null;
  }

  if (isLoading)
    return (
      <div className="bg-light-parchment relative flex min-h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );

  return (
    <div className="bg-light-parchment relative flex h-full">
      <EssayForm data={data} />
      <TiptapEditor data={data} />
      <EditorAICompanion slug={slug} data={data} />
    </div>
  );
};

export default EssayEditor;
