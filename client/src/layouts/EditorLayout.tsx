import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Toolbar from "../components/Toolbar";

const EditorLayout = () => {
  return (
    <>
      <Toolbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default EditorLayout;
