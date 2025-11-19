import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Toolbar from "../components/Toolbar";
import EditorHeader from "../components/layout/EditorHeader";
import { FormProvider, useForm } from "react-hook-form";

export interface IFormInput {
  essayTitle: string;
  excerpt: string;
  category: string;
}

const EditorLayout = () => {
  const methods = useForm<IFormInput>();

  return (
    <>
      <FormProvider {...methods}>
        <EditorHeader />
        <Toolbar />
        <Outlet />
        <Footer />
      </FormProvider>
    </>
  );
};

export default EditorLayout;
