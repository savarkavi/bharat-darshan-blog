import essayImage from "/essay-card-placeholder.jpg";
import { CiBookmark } from "react-icons/ci";

const EssayCard = () => {
  return (
    <div className="mx-auto w-full max-w-[350px]">
      <div className="w-[350px]">
        <img
          src={essayImage}
          alt="essay cover image"
          className="rounded-t-sm object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-saffron flex items-center gap-2 text-lg font-semibold">
          <CiBookmark size="24" /> <span>Philosophy</span>
        </p>
        <p className="text-copper-brown text-3xl font-bold">
          Notes on Rama: The self-sacrificing altruist
        </p>
        <p className="text-camel-tan text-lg font-semibold">
          Known as the epitome of righteousness, he is revered for embodying
          virtues such as duty, compassion, courage, and truth.
        </p>
        <div className="text-saffron flex items-center gap-2 font-semibold">
          <p>Oct 25.</p>
          <p>Sushant Sharma</p>
        </div>
      </div>
    </div>
  );
};

export default EssayCard;
