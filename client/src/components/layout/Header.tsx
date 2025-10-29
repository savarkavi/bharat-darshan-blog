import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Button from "../common/Button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div
      className={`fixed top-0 left-0 z-99 flex w-full items-center justify-between px-4 py-2 transition-all ${scrolled ? "bg-maroon text-white" : "text-saffron bg-transparent"}`}
    >
      <img src={logo} alt="logo" className="h-12 w-12" />
      <div className="hidden items-center gap-10 text-lg font-semibold xl:flex">
        <a href="/">Philosophy</a>
        <a href="/">Science</a>
        <a href="/">Culture</a>
        <a href="/">History</a>
      </div>
      <div>
        <Button>Log In</Button>
      </div>
    </div>
  );
};

export default Header;
