import EssayCard from "../common/EssayCard";

const FeaturedArticles = () => {
  return (
    <div className="flex min-h-screen flex-col gap-20 p-4 xl:p-8">
      <h2 className="text-copper-brown mt-12 text-center text-5xl lg:mt-16 lg:text-6xl">
        Featured Essays
      </h2>
      <div className="mx-auto grid w-full max-w-[1360px] justify-center gap-16 lg:grid-cols-2 xl:grid-cols-3">
        <EssayCard />
        <EssayCard />
        <EssayCard />
        <EssayCard />
        <EssayCard />
        <EssayCard />
      </div>
    </div>
  );
};

export default FeaturedArticles;
