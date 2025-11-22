import { useFormContext, type FieldError } from "react-hook-form";
import type { IFormInput } from "../../layouts/EditorLayout";
import type { Blog } from "../../types/types";
import { useEffect, useState, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import FormValidationError from "../common/FormValidationError";

interface EssayFormProps {
  data: Blog | undefined;
}

const EssayForm = ({ data }: EssayFormProps) => {
  const {
    register,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<IFormInput>();
  const [tagInput, setTagInput] = useState("");

  const tags = watch("tags");

  const isPublishing = useCallback(() => getValues("isPublished"), [getValues]);

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
      validate: (value) => {
        if (!isPublishing()) return;
        return value.length >= 3 || "Please add at least 3 tags to publish";
      },
    });
  }, [register, isPublishing]);

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

  const validateExcerpt = (value: string) => {
    if (!isPublishing()) return true;
    return (
      (value && value.trim().length > 0) || "Excerpt is required to publish"
    );
  };

  const validateCategory = (value: string) => {
    if (!isPublishing()) return true;
    return (value && value !== "default") || "Category is required to publish";
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
          <FormValidationError
            field={errors.essayTitle}
            errorType="required"
            message="Title is required"
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
            {...register("excerpt", { validate: validateExcerpt })}
            id="excerpt"
            rows={5}
            className="bg-light-parchment rounded-lg border p-2 outline-none"
            placeholder="Write a small excerpt about your essay"
          />
          <FormValidationError
            field={errors.excerpt}
            errorType="validate"
            message="Excerpt is required"
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
            {...register("category", { validate: validateCategory })}
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
          <FormValidationError
            field={errors.category}
            errorType="validate"
            message="Please select a category"
          />
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
          <FormValidationError
            field={errors.tags as FieldError | undefined}
            errorType="validate"
            message="Please add at least 3 tags"
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
