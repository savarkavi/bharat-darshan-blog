import CommentForm from "../forms/CommentForm";
import { useGetBlogComments } from "../../api/comment/commentApi";
import CommentItem from "./CommentItem";
import type { Author, Blog } from "../../types/types";
import Button from "./Button";

interface CommentsContainerProps {
  blog: Blog<Author>;
  limit: number;
}

const CommentsContainer = ({ blog, limit }: CommentsContainerProps) => {
  const {
    data: blogComments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetBlogComments({
    blogId: blog._id,
    limit,
  });

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-12">
      <p className="text-saffron text-3xl font-bold">
        {`Discussions about ${limit > 3 ? blog.title : "this essay"}`}
        {limit > 3 && (
          <span className="text-xl text-gray-500">{`By ${blog.author.fullname}`}</span>
        )}
      </p>
      <div>
        <CommentForm blogId={blog._id} parentCommentId={null} />
      </div>
      <div className="flex flex-col gap-4">
        {blogComments?.pages.map((page) =>
          page.comments.map((comment) => {
            return (
              <CommentItem
                key={comment._id}
                comment={comment}
                blogId={blog._id}
              />
            );
          }),
        )}
      </div>
      {hasNextPage && limit > 3 && (
        <Button
          isLoading={isFetchingNextPage}
          className="w-28 py-2"
          onClick={() => fetchNextPage()}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default CommentsContainer;
