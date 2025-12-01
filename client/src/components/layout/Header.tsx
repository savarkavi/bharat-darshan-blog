import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { useAuthUser, useSignOut } from "../../api/auth/authApi";
import Avatar from "react-avatar";
import { DropdownMenu } from "../common/Dropdown";
import { FaUser } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuthUser();
  const { mutate: signOut } = useSignOut();

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
      <Link to={"/"}>
        <img src={logo} alt="logo" className="h-12 w-12" />
      </Link>
      <div className="hidden items-center gap-10 text-lg font-semibold xl:flex">
        <a href="/">Philosophy</a>
        <a href="/">Science</a>
        <a href="/">Culture</a>
        <a href="/">History</a>
      </div>
      {isAuthenticated ? (
        <div>
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <Avatar
                name={user?.fullname}
                src={user?.avatar}
                round
                size="40px"
                textMarginRatio={0.15}
                className="cursor-pointer hover:brightness-105"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content position="Right" classNames="p-1 text-black">
              <div className="min-w-36 text-nowrap">
                <div className="hover:bg-light-parchment flex items-center gap-3 rounded-md p-2">
                  <FaUser />
                  <p>Profile</p>
                </div>
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
