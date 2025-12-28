import { format } from "date-fns";
import type { Comment } from "../../types/types";
import { CiChat1, CiHeart } from "react-icons/ci";
import { useState } from "react";
import Avatar from "react-avatar";
import CommentForm from "../forms/CommentForm";
import { FaChevronDown } from "react-icons/fa6";
import { useGetCommentReplies } from "../../api/comment/commentApi";
import { cn } from "../../lib/utils";
import { ImSpinner2 } from "react-icons/im";

interface CommentItemProps {
  comment: Comment;
  blogId: string;
}

const CommentItem = ({ comment, blogId }: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);

  const { data: replies, isLoading } = useGetCommentReplies(
    comment._id,
    openReplies,
  );

  return (
    <div key={comment._id} className={cn("flex gap-2 pb-4 md:gap-4")}>
      <div className="flex flex-col items-center gap-1">
        <Avatar
          name={comment.author.fullname}
          src={comment.author.avatar}
          round
          size="40px"
          textMarginRatio={0.15}
          className="cursor-pointer hover:brightness-105"
        />
        {comment.repliesCount > 0 && (
          <div className="bg-ash-grey h-full w-px" />
        )}
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="text-saffron font-semibold capitalize md:text-lg">
              {comment.author.fullname}
            </p>
            <p className="text-gray-600">
              {format(comment.createdAt, "LLL d")}
            </p>
          </div>
          <p className="text-lg md:text-xl">{comment.content}</p>
          <div className="mt-2 flex items-center gap-6 text-gray-600">
            <div className="flex cursor-pointer items-center gap-1 select-none">
              <CiHeart className="size-5" />
              <p>Like ({`${comment.likes}`})</p>
            </div>
            <div
              className="flex cursor-pointer items-center gap-1 select-none"
              onClick={() => setShowReplyForm((prev) => !prev)}
            >
              <CiChat1 className="size-5" />
              <p>Reply</p>
            </div>
          </div>
          {showReplyForm && (
            <div className="mt-4">
              <CommentForm blogId={blogId} parentCommentId={comment._id} />
            </div>
          )}
        </div>
        {comment.repliesCount > 0 && (
          <div className="mt-4 -ml-3 flex items-center gap-2">
            <div
              onClick={() => setOpenReplies((prev) => !prev)}
              className="flex w-fit cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-gray-600 select-none hover:bg-gray-200"
            >
              <p className="text-lg font-semibold">{`${comment.repliesCount} ${comment.repliesCount === 1 ? "reply" : "replies"}`}</p>
              <FaChevronDown
                className={cn(
                  "mt-1 size-3 transition-all",
                  openReplies ? "rotate-180" : "rotate-0",
                )}
              />
            </div>
            {isLoading && <ImSpinner2 className="animate-spin" />}
          </div>
        )}
        {openReplies && (
          <div className="mt-8 flex w-full flex-col gap-4">
            {replies?.map((reply) => (
              <CommentItem key={reply._id} blogId={blogId} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
