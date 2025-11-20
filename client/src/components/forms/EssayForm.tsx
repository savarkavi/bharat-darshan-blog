import { useFormContext } from "react-hook-form";
import type { IFormInput } from "../../layouts/EditorLayout";
import type { Blog } from "../../types/types";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface EssayFormProps {
  data: Blog | undefined;
}

const EssayForm = ({ data }: EssayFormProps) => {
  const { register, reset, setValue, watch } = useFormContext<IFormInput>();
  const [tagInput, setTagInput] = useState("");

  const tags = watch("tags");

  useEffect(() => {
    if (data) {
      reset({
        essayTitle: data.title,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags,
      });
    }
  }, [data, reset]);

  useEffect(() => {
    register("tags", {
      validate: (value) => value.length >= 3 || "Please add at least 3 tags",
    });
  }, [register]);

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      if (!tags.includes(tagInput)) {
        setValue("tags", [...tags, tagInput]);
      }

      setTagInput("");
    }
  };

  const handleTagRemove = (removeTag: string) => {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setValue("tags", newTags);
  };

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
        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-maroon text-xl font-semibold">
            Tags
          </label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            id="tags"
            className="bg-light-parchment rounded-lg border p-2 outline-none"
            placeholder="Add related tags (press Enter)..."
            onKeyDown={handleTagAdd}
          />
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {tags.map((tag) => (
              <p
                key={tag}
                className="bg-saffron relative flex cursor-default items-center gap-2 rounded-md px-3 py-1 text-white"
              >
                {tag}
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => handleTagRemove(tag)}
                />
              </p>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EssayForm;
