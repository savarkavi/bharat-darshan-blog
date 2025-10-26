import Button from "../common/Button";
import heroLightImg from "/hero-light.jpg";

const Hero = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <div className="relative z-10 w-full flex-1/2">
        <div className="absolute top-[40%] left-1/2 flex w-full -translate-x-1/2 flex-col items-center text-center">
          <h1 className="font-samarkan text-copper-brown w-full text-[9rem]">
            BHARATA DARSHANA
          </h1>
          <p className="text-saffron max-w-xl text-xl font-semibold capitalize">
            Exploring the timeless wisdom of ancient philosophy, science, the
            grandeur of historical narratives, the sacred geography, and the
            vibrant cultural traditions of Bharat.
          </p>
          <Button className="mt-8 py-2 text-lg">Explore Essays</Button>
        </div>
      </div>
      <div className="relative flex-1/2 bg-black">
        <img
          src={heroLightImg}
          alt="Ayodhya city image"
          className="w-full object-cover opacity-80"
        />
        <div className="from-light-parchment absolute top-0 left-0 h-full w-full bg-linear-to-b" />
      </div>
    </div>
  );
};

export default Hero;
