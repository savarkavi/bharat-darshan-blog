import logo from "../../assets/logo.png";
import FooterNewsletter from "../FooterNewsletter";

const Footer = () => {
  return (
    <div className="bg-maroon h-full min-h-[350px] w-full px-4 py-12 xl:px-8">
      <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-24 xl:flex-row">
        <div className="flex flex-col gap-24 md:flex-row">
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
          <div className="text-camel-tan flex gap-20 lg:text-xl">
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
        </div>
        <FooterNewsletter />
      </div>
    </div>
  );
};

export default Footer;
