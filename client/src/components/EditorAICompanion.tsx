import { useForm, type SubmitHandler } from "react-hook-form";
import { useAskPerplexity } from "../api/ai/aiApi";
import Button from "./common/Button";
import { ImSpinner2 } from "react-icons/im";
import FormValidationError from "./common/FormValidationError";
import type { Author, Blog, PerplexityResearchResult } from "../types/types";
import { FaCircle } from "react-icons/fa6";
import AIQueriesModal from "./AIQueriesModal";
import { useState } from "react";

interface IFormInput {
  query: string;
}

interface EditorAICompanionProps {
  slug: string;
  data: Blog<Author>;
}

const EditorAICompanion = ({ slug, data: blog }: EditorAICompanionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { mutate, isPending } = useAskPerplexity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] =
    useState<PerplexityResearchResult | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    mutate({ query: data.query, blogSlug: slug });

  return (
    <div className="bg-dark-parchment border-ash-grey absolute top-0 right-0 flex h-full w-full max-w-[350px] flex-col gap-8 border-r p-8">
      <div className="text-charcoal-black flex flex-col items-center gap-2">
        <p className="text-maroon text-xl font-semibold">A.I companion</p>
        <p>
          Enter a topic or a question. A.I will research and compose the essay
          automatically for you.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <textarea
          {...register("query", { required: true })}
          id="query"
          rows={5}
          className="bg-light-parchment w-full rounded-lg border p-2 outline-none"
          placeholder="e.g. Who was Lord Rama and what is his significance?"
        />
        <FormValidationError
          field={errors.query}
          errorType="required"
          message="Query is required!"
        />
        <Button className="w-24 self-end">
          {isPending ? <ImSpinner2 className="my-1 animate-spin" /> : "Submit"}
        </Button>
      </form>
      <p className="text-maroon text-center text-xl font-semibold">
        Your Queries
      </p>

      <div>
        {blog.researchResults.map((result) => (
          <div
            key={result.research.id}
            className="text-charcoal-black hover:text-saffron flex items-center gap-2"
            onClick={() => {
              setSelectedResearch(result);
              setIsModalOpen(true);
            }}
          >
            <FaCircle className="size-2" />
            <p className="line-clamp-1 cursor-pointer text-lg">
              {result.research.search_results[0].title}
            </p>
          </div>
        ))}
      </div>
      {isModalOpen && selectedResearch && (
        <AIQueriesModal
          selectedResearch={selectedResearch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EditorAICompanion;
