import EssayCard from "../common/EssayCard";

const FeaturedArticles = () => {
  return (
    <div className="flex min-h-screen flex-col gap-20 p-8">
      <h2 className="text-copper-brown mt-16 text-center text-6xl">
        Featured Essays
      </h2>
      <div className="mx-auto grid w-full max-w-[1360px] grid-cols-3 gap-16">
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
