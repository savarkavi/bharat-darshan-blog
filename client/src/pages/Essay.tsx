import { Link, useParams } from "react-router-dom";
import { useGetBlog } from "../api/blog/blogApi";
import { ImSpinner2 } from "react-icons/im";
import EssayContent from "../components/essay/EssayContent";
import EssayStats from "../components/essay/EssayStats";
import CommentsContainer from "../components/common/CommentsContainer";

const Essay = () => {
  const { slug } = useParams();

  const { data: blog, isLoading } = useGetBlog(slug);

  if (isLoading)
    return (
      <div className="bg-light-parchment relative flex min-h-screen items-center justify-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );

  if (!blog) {
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
    <div>
      <div className="bg-lightest-parchment mt-[64px] flex h-[calc(100vh-64px)] w-full items-center">
        <div className="flex w-full flex-[50%] flex-col items-center justify-center gap-6 px-12 text-center">
          <h1 className="text-charcoal-black font-bolton text-7xl">
            {blog.title}
          </h1>
          <p className="text-copper-brown max-w-[600px] text-xl">
            {blog.excerpt}
          </p>
        </div>
        <div className="h-full w-full flex-[50%]">
          <img
            src={blog?.coverImage}
            alt="essay cover image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-16 pb-24">
        <EssayContent blog={blog} />
        <EssayStats />
        <CommentsContainer blog={blog} limit={3} />
      </div>
    </div>
  );
};

export default Essay;
