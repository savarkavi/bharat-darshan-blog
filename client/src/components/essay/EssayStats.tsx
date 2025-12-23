import { CiHeart, CiShare2, CiChat1 } from "react-icons/ci";
import type { GetBlogBySlugData } from "../../types/types";

const EssayStats = ({ data }: { data: GetBlogBySlugData }) => {
  return (
    <div className="border-ash-grey mx-auto flex w-full max-w-[800px] items-center justify-between border-y py-4">
      <div className="flex items-center gap-6">
        <div className="border-ash-grey flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-lg select-none hover:bg-gray-200">
          <CiHeart className="size-5" />
          <p>{data.blog.likes}</p>
        </div>
        <div className="border-ash-grey flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-lg select-none hover:bg-gray-200">
          <CiChat1 className="size-5" />
          <p>{data.totalComments}</p>
        </div>
      </div>
      <div className="border-ash-grey flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-lg select-none hover:bg-gray-200">
        <CiShare2 className="size-5" />
        <p>Share</p>
      </div>
    </div>
  );
};

export default EssayStats;
