import { useFormContext } from "react-hook-form";
import type { IFormInput } from "../../layouts/EditorLayout";
import type { Blog } from "../../types/types";
import { useEffect } from "react";

interface EssayFormProps {
  data: Blog | undefined;
}

const EssayForm = ({ data }: EssayFormProps) => {
  const { register, reset } = useFormContext<IFormInput>();

  useEffect(() => {
    if (data) {
      reset({
        essayTitle: data.title,
        excerpt: data.excerpt,
        category: data.category,
      });
    }
  }, [data, reset]);

  return (
    <div className="bg-dark-parchment border-ash-grey absolute top-0 left-0 h-screen w-full max-w-[350px] border-r p-8">
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="essayTitle"
            className="text-maroon text-xl font-semibold"
          >
            Essay Title
          </label>
          <input
            {...register("essayTitle", { required: true })}
            id="essayTitle"
            className="bg-light-parchment rounded-lg border p-2 outline-none"
            placeholder="Enter your essay title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="excerpt"
            className="text-maroon text-xl font-semibold"
          >
            Brief Excerpt
          </label>
          <textarea
            {...register("excerpt", { required: true })}
            id="excerpt"
            rows={5}
            className="bg-light-parchment rounded-lg border p-2 outline-none"
            placeholder="Write a small excerpt about your essay"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-maroon text-xl font-semibold"
          >
            Category
          </label>
          <select
            {...register("category", { required: true })}
            defaultValue="default"
            id="category"
            className="bg-light-parchment rounded-lg border p-2 outline-none"
          >
            <option value="default" disabled>
              Select a category
            </option>
            <option value="philosophy">Philosophy</option>
            <option value="history">History</option>
            <option value="culture">Culture</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default EssayForm;
