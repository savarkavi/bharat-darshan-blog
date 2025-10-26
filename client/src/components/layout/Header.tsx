import logo from "../../assets/logo.png";
import Button from "../common/Button";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 z-99 flex w-full items-center justify-between px-3 py-2">
      <img src={logo} alt="logo" className="h-12 w-12" />
      <div className="text-saffron flex items-center gap-10 text-lg font-semibold">
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

// #902c14

export default Header;
