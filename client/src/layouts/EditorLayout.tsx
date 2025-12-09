import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Toolbar from "../components/Toolbar";
import EditorHeader from "../components/layout/EditorHeader";
import { FormProvider, useForm } from "react-hook-form";

export interface IFormInput {
  essayTitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: File | string | null;
  isPublished: boolean;
}

const EditorLayout = () => {
  const methods = useForm<IFormInput>({
    defaultValues: {
      essayTitle: "",
      excerpt: "",
      category: "",
      coverImage: null,
      tags: [],
      isPublished: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-screen flex-col justify-between">
        <div>
          <EditorHeader />
          <Toolbar />
        </div>
        <div className="bg-light-parchment min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </FormProvider>
  );
};

export default EditorLayout;
