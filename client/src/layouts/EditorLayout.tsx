import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Toolbar from "../components/Toolbar";
import EditorHeader from "../components/layout/EditorHeader";

const EditorLayout = () => {
  return (
    <>
      <EditorHeader />
      <Toolbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default EditorLayout;
