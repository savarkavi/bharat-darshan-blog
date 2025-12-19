import { useForm, type SubmitHandler } from "react-hook-form";
import { useAskPerplexity } from "../api/ai/aiApi";
import Button from "./common/Button";
import FormValidationError from "./common/FormValidationError";
import type { Author, Blog, PerplexityResearchResult } from "../types/types";
import { FaCircle } from "react-icons/fa6";
import AIQueriesModal from "./AIQueriesModal";
import { useEffect, useRef, useState } from "react";

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
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { mutate, isPending } = useAskPerplexity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] =
    useState<PerplexityResearchResult | null>(null);
  const [researchOutput, setResearchOutput] = useState("");
  const [hasStreamStarted, setHasStreamStarted] = useState(false);

  const prevResultCountRef = useRef(blog.researchResults.length);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSelectedResearch(null);
    setResearchOutput("");
    setHasStreamStarted(false);
    setIsModalOpen(true);

    prevResultCountRef.current = blog.researchResults.length;

    mutate({
      query: data.query,
      blogSlug: slug,
      onChunk: (chunk: string) => {
        setHasStreamStarted(true);
        setResearchOutput((prev) => prev + chunk);
      },
    });

    reset();
  };

  useEffect(() => {
    if (!isPending && hasStreamStarted) {
      if (blog.researchResults.length > prevResultCountRef.current) {
        const sortedResults = [...blog.researchResults].sort(
          (a, b) => b.research.createdAt - a.research.createdAt,
        );
        const latestResult = sortedResults[0];
        if (latestResult) {
          setSelectedResearch(latestResult);
        }
        setHasStreamStarted(false);
      }
    }
  }, [isPending, hasStreamStarted, blog.researchResults]);

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
        <Button isLoading={isPending} className="w-24 self-end">
          Submit
        </Button>
      </form>
      <p className="text-maroon text-center text-xl font-semibold">
        Your Queries
      </p>

      <div className="scrollbar-thin-custom flex h-full flex-col gap-2 overflow-y-auto">
        {blog.researchResults
          .sort((a, b) => b.research.createdAt - a.research.createdAt)
          .map((result, i) => (
            <div
              key={i}
              className="text-charcoal-black hover:text-saffron flex items-center gap-2 select-none"
              onClick={() => {
                setSelectedResearch(result);
                setIsModalOpen(true);
              }}
            >
              <FaCircle className="size-[6px] shrink-0" />
              <p className="line-clamp-1 cursor-pointer text-lg">
                {result.research.search_results[0].title}
              </p>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <AIQueriesModal
          selectedResearch={selectedResearch}
          researchOutput={researchOutput}
          hasStreamStarted={selectedResearch ? false : hasStreamStarted}
          isPending={isPending}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EditorAICompanion;
