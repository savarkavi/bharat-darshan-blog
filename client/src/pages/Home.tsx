import FeaturedArticles from "../components/home/FeaturedArticles";
import Hero from "../components/home/Hero";

const Home = () => {
  return (
    <div className="bg-light-parchment min-h-screen pb-24">
      <Hero />
      <FeaturedArticles />
    </div>
  );
};

export default Home;
