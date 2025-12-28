import { CiShare2, CiChat1 } from "react-icons/ci";
import { Heart } from "lucide-react";
import type { GetBlogBySlugData, User } from "../../types/types";
import { useLikeBlog } from "../../api/blog/blogApi";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface EssayStatsProps {
  data: GetBlogBySlugData;
  user: User | null | undefined;
}

const EssayStats = ({ data, user }: EssayStatsProps) => {
  const navigate = useNavigate();
  const { mutate } = useLikeBlog({ slug: data.blog.slug });

  const isLiked = data.blog.likes.find((id) => id === user?.userId);

  const handleLike = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    mutate({ userId: user.userId });
  };

  return (
    <div className="border-ash-grey mx-auto flex w-full max-w-[800px] items-center justify-between border-y px-6 py-4">
      <div className="flex items-center gap-6">
        <div
          onClick={handleLike}
          className="border-ash-grey flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-lg select-none hover:bg-gray-200"
        >
          <Heart
            strokeWidth="1px"
            className={cn("size-5", isLiked && "fill-red-500 stroke-red-500")}
          />
          <p>{data.blog.likes.length}</p>
        </div>
        <Link to={"comments"}>
          <div className="border-ash-grey flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-lg select-none hover:bg-gray-200">
            <CiChat1 className="size-5" />
            <p>{data.totalComments}</p>
          </div>
        </Link>
      </div>
      <div className="border-ash-grey flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-lg select-none hover:bg-gray-200">
        <CiShare2 className="size-5" />
        <p>Share</p>
      </div>
    </div>
  );
};

export default EssayStats;
