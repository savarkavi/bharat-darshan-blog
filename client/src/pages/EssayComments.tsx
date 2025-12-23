import { Link, useParams } from "react-router-dom";
import { useGetBlog } from "../api/blog/blogApi";
import CommentsContainer from "../components/common/CommentsContainer";
import { ImSpinner2 } from "react-icons/im";

const EssayComments = () => {
  const { slug } = useParams();

  const { data, isLoading } = useGetBlog(slug);

  if (isLoading)
    return (
      <div className="bg-light-parchment relative flex min-h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );

  if (!data || !data.blog) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 text-2xl">
        <p className="text-xl xl:text-3xl">
          Seems like the blog you are trying to access has been deleted :(
        </p>
        <Link to="/" className="text-maroon underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-[64px] pt-20 pb-16">
      <CommentsContainer blogData={data} limit={4} />
    </div>
  );
};

export default EssayComments;
