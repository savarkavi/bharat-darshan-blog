import { Link, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import Button from "../common/Button";
import { GoKebabHorizontal } from "react-icons/go";
import { cn } from "../../lib/utils";
import { useUser } from "../../hooks/useUser";

export const ProfileHeader = () => {
  const profileTabs = [
    { id: "posts", label: "Posts", href: "/profile" },
    { id: "bookmarks", label: "Bookmarks", href: "/profile/bookmarks" },
    { id: "likes", label: "Likes", href: "/profile/likes" },
  ];

  const user = useUser();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === "/profile") return "posts";
    if (location.pathname === "/profile/bookmarks") return "bookmarks";
    if (location.pathname === "/profile/likes") return "likes";
  };

  const activeTab = getActiveTab();

  return (
    <div className="mx-auto mt-[150px] flex max-w-[600px] flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex cursor-default flex-col">
          <p className="text-saffron text-3xl font-semibold capitalize">
            {user.fullname}
          </p>
          <p className="text-lg text-gray-600">{`@${user.username}`}</p>
        </div>
        <Avatar
          name={user.fullname}
          src={user.avatar}
          round
          size="80px"
          textMarginRatio={0.25}
          className="cursor-pointer select-none hover:brightness-105"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button className="w-full py-2">New Essay</Button>
        <Button className="bg-maroon w-full py-2">Edit profile</Button>
        <div className="cursor-pointer rounded-md bg-gray-200 p-2 hover:bg-gray-300">
          <GoKebabHorizontal className="size-5" />
        </div>
      </div>
      <div className="flex w-full items-center py-2 text-xl text-gray-600">
        {profileTabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.href}
            className={cn(
              "flex flex-1 items-center justify-between border-b",
              activeTab === tab.id
                ? "border-saffron text-saffron border-b-2"
                : "border-gray-400",
            )}
          >
            <button className="w-full cursor-pointer text-center">
              {tab.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
