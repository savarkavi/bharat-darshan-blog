import CommentForm from "../forms/CommentForm";
import { useGetBlogComments } from "../../api/comment/commentApi";
import CommentItem from "./CommentItem";
import type { GetBlogBySlugData } from "../../types/types";
import Button from "./Button";
import { Link, useLocation } from "react-router-dom";

interface CommentsContainerProps {
  blogData: GetBlogBySlugData;
  limit: number;
}

const CommentsContainer = ({ blogData, limit }: CommentsContainerProps) => {
  const {
    data: blogComments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetBlogComments({
    blogId: blogData.blog._id,
    limit,
  });

  const { pathname } = useLocation();

  const isCommentsPage = pathname.includes("/comments");

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-12">
      <div className="text-saffron text-3xl font-bold">
        <p>{`Discussions about ${isCommentsPage ? blogData.blog.title : "this essay"}`}</p>
        {isCommentsPage && (
          <p className="text-xl text-gray-500">{`By ${blogData.blog.author.fullname}`}</p>
        )}
      </div>
      <div>
        <CommentForm blogId={blogData.blog._id} parentCommentId={null} />
      </div>
      <div className="flex flex-col gap-4">
        {isCommentsPage
          ? blogComments?.pages.map((page) =>
              page.comments.map((comment) => {
                return (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    blogId={blogData.blog._id}
                  />
                );
              }),
            )
          : blogComments?.pages[0].comments
              .slice(0, 3)
              .map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  blogId={blogData.blog._id}
                />
              ))}
      </div>
      {!isCommentsPage && blogData.parentComments > 3 && (
        <Link
          to={`/essays/${blogData.blog.slug}/comments`}
          className="w-fit text-xl text-gray-600"
        >
          See more comments...
        </Link>
      )}
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
