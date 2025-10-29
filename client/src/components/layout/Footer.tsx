import logo from "../../assets/logo.png";
import FooterNewsletter from "../FooterNewsletter";

const Footer = () => {
  return (
    <div className="bg-maroon h-[350px] w-full px-8 pt-12">
      <div className="mx-auto flex max-w-[1360px] gap-24">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-12 w-12" />
            <p className="text-copper-brown text-4xl">Bharata Darshana</p>
          </div>
          <p className="text-ash-grey ml-1 max-w-[400px]">
            Preserving and sharing the timeless wisdom of Bharat through
            thoughtful exploration and scholarly discourse.
          </p>
        </div>
        <div className="text-camel-tan flex gap-20 text-xl">
          <div className="flex flex-col gap-3">
            <p>Essays</p>
            <p>Videos</p>
          </div>
          <div className="flex flex-col gap-3">
            <p>About</p>
            <p>Contact</p>
          </div>
          <div className="flex flex-col gap-3">
            <p>Philosophy</p>
            <p>Science</p>
            <p>Culture</p>
            <p>History</p>
          </div>
        </div>
        <FooterNewsletter />
      </div>
    </div>
  );
};

export default Footer;
