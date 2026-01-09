import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Button from "../common/Button";
import { Link, useLocation } from "react-router-dom";
import { useAuthUser, useSignOut } from "../../api/auth/authApi";
import Avatar from "react-avatar";
import { DropdownMenu } from "../common/Dropdown";
import { FaUser } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import NewEssayButton from "../NewEssayButton";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuthUser();
  const { mutate: signOut } = useSignOut();

  const { pathname } = useLocation();

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
      className={`fixed top-0 left-0 z-99 flex h-[64px] w-full items-center justify-between px-4 py-2 transition-all ${pathname === "/" ? (scrolled ? "bg-maroon text-white" : "text-saffron bg-transparent") : "bg-light-parchment border-dark-parchment border-b text-black shadow-sm"}`}
    >
      <Link to={"/"}>
        <img src={logo} alt="logo" className="h-12 w-12" />
      </Link>
      <div className="absolute top-1/2 left-1/2 hidden -translate-1/2 items-center gap-10 text-lg font-semibold xl:flex">
        <a href="/">Philosophy</a>
        <a href="/">Science</a>
        <a href="/">Culture</a>
        <a href="/">History</a>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <Avatar
                name={user?.fullname}
                src={user?.avatar}
                round
                size="40px"
                textMarginRatio={0.15}
                className="cursor-pointer select-none hover:brightness-105"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content position="Right" classNames="p-1 text-black">
              <div className="min-w-36 text-nowrap">
                <Link
                  to={"/profile"}
                  className="hover:bg-light-parchment flex items-center gap-3 rounded-md p-2"
                >
                  <FaUser />
                  <p>Profile</p>
                </Link>
                <div
                  className="hover:bg-light-parchment flex cursor-pointer items-center gap-3 rounded-md p-2"
                  onClick={() => signOut()}
                >
                  <GoSignOut />
                  <p>Sign Out</p>
                </div>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu>
          <NewEssayButton />
        </div>
      ) : (
        <Link to={"/sign-in"}>
          <Button>Log In</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
