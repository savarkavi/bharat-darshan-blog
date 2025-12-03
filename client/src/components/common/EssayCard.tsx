import type { Blog } from "../../types/types";
import { CiBookmark } from "react-icons/ci";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface EssayCardProps {
  blog: Blog;
}

const EssayCard = ({ blog }: EssayCardProps) => {
  return (
    <Link
      to={`/essays/${blog.slug}`}
      className="group bg-lightest-parchment mx-auto flex h-[520px] w-full max-w-[400px] flex-col rounded-md"
    >
      <div className="relative h-[450px] w-[400px] overflow-hidden">
        <img
          src={blog.coverImage}
          alt="essay cover image"
          className="h-full w-full rounded-t-sm object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="from-lightest-parchment absolute bottom-0 left-0 h-24 w-full bg-linear-to-t"></div>
      </div>
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-3">
          <p className="text-saffron flex items-center gap-2 text-lg font-semibold capitalize">
            <CiBookmark size="24" /> <span>{blog.category}</span>
          </p>
          <p className="text-copper-brown line-clamp-2 text-3xl font-bold">
            {blog.title}
          </p>
          <p className="text-camel-tan line-clamp-2 font-semibold">
            {blog.excerpt}
          </p>
        </div>
        <div className="text-saffron border-dark-parchment flex items-center justify-between gap-2 border-t pt-4 font-semibold">
          <p className="capitalize">{blog.author.fullname}</p>
          <p className="text-camel-tan">{format(blog.createdAt, "do LLL y")}</p>
        </div>
      </div>
    </Link>
  );
};

export default EssayCard;
