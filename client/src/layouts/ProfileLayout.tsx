import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ProfileHeader } from "../components/layout/ProfileHeader";

export const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <Header />
        <ProfileHeader />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};
