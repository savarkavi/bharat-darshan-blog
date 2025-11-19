import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoMdEye } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import Button from "../common/Button";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { IFormInput } from "../../layouts/EditorLayout";
import { useEditorStore } from "../../store/use-editor";
import { useSaveDraft } from "../../api/blog/blogApi";
import { ImSpinner2 } from "react-icons/im";

const EditorHeader = () => {
  const { handleSubmit } = useFormContext<IFormInput>();
  const editor = useEditorStore((state) => state.editor);
  const { mutate, isPending } = useSaveDraft();
  const { slug } = useParams();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate({
      data: {
        title: data.essayTitle,
        excerpt: data.excerpt,
        category: data.category,
        content: editor?.getJSON(),
        coverImage: "adfsd",
        tags: ["hi", "there"],
      },
      slug,
    });
  };

  return (
    <div className="bg-light-parchment flex items-center justify-between px-4 py-2">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="h-12 w-12" />
      </Link>
      <div className="flex items-center gap-6">
        <Button className="flex items-center gap-2 bg-green-500">
          <IoMdEye />
          <span>Preview</span>
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-saffron flex h-8 w-32 items-center justify-center"
        >
          {isPending ? (
            <ImSpinner2 className="animate-spin" />
          ) : (
            <div className="flex w-full items-center gap-2">
              <FaSave />
              <span>Save Draft</span>
            </div>
          )}
        </Button>
        <Button className="bg-maroon flex items-center gap-2">
          <MdOutlinePublish />
          <span>Publish</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
