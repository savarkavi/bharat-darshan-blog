import CommentForm from "../forms/CommentForm";
import type { Author, Blog } from "../../types/types";
import { useGetBlogComments } from "../../api/comment/commentApi";

import CommentItem from "./CommentItem";

const EssayComments = ({ blog }: { blog: Blog<Author> }) => {
  const { data: blogComments } = useGetBlogComments(blog._id);

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-12">
      <p className="text-saffron text-2xl font-bold">
        Discussions about this essay
      </p>
      <div>
        <CommentForm blogId={blog._id} parentCommentId={null} />
      </div>
      <div className="flex flex-col gap-4">
        {blogComments?.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              blogId={blog._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EssayComments;
