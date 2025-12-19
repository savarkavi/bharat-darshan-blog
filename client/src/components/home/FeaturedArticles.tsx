import { useGetAllBlogs } from "../../api/blog/blogApi";
import Button from "../common/Button";
import EssayCard from "../common/EssayCard";

const FeaturedArticles = () => {
  const {
    data: blogs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllBlogs();

  return (
    <div className="flex min-h-screen flex-col gap-20 p-4 xl:p-8">
      <h2 className="text-copper-brown mt-12 text-center text-5xl lg:mt-16 lg:text-6xl">
        Featured Essays
      </h2>
      <div className="mx-auto grid w-full max-w-[1320px] justify-center gap-12 lg:grid-cols-2 xl:grid-cols-3">
        {blogs?.pages.map((page) =>
          page.blogs.map((blog) => <EssayCard key={blog._id} blog={blog} />),
        )}
      </div>
      {hasNextPage && (
        <Button
          isLoading={isFetchingNextPage}
          className="mx-auto min-w-28 py-2"
          onClick={() => fetchNextPage()}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default FeaturedArticles;
