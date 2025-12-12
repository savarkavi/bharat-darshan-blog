import { IoMdClose } from "react-icons/io";
import type { PerplexityResearchResult } from "../types/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MagnifyingGlass, ThreeDots } from "react-loader-spinner";
import { cn } from "../lib/utils";

interface AIQueriesModalProps {
  selectedResearch: PerplexityResearchResult | null;
  hasStreamStarted: boolean;
  isPending: boolean;
  researchOutput: string;
  onClose: () => void;
}

const AIQueriesModal = ({
  selectedResearch,
  researchOutput,
  hasStreamStarted,
  isPending,
  onClose,
}: AIQueriesModalProps) => {
  const formattedContent = selectedResearch
    ? selectedResearch.research.content
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .replace(/\[(\d+)\]/g, (match: string, number: string) => {
          const index = parseInt(number) - 1;
          const url = selectedResearch.research.citations[index];

          return url ? `[[${number}]](${url})` : match;
        })
    : researchOutput.trim().replace(/<think>[\s\S]*?<\/think>/g, "");

  const isInitializing = !hasStreamStarted && !selectedResearch;

  const isThinking =
    !selectedResearch &&
    hasStreamStarted &&
    formattedContent.trim().startsWith("<think>");

  const showLoader = isInitializing || isThinking;

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
      onClick={() => {
        if (isPending) return;
        onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="bg-dark-parchment relative z-50 h-[650px] w-full max-w-[800px] rounded-lg p-6 pt-12"
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          className={cn(
            "absolute top-4 right-4 size-6",
            isPending ? "cursor-not-allowed" : "cursor-pointer",
          )}
          onClick={() => {
            if (isPending) return;
            onClose();
          }}
        />
        <div className="text-charcoal-black bg-light-parchment h-full overflow-y-auto border px-6 py-4">
          {showLoader ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              {isInitializing && (
                <div className="flex flex-col items-center gap-2">
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#902c14"
                  />
                  <p className="text-charcoal-black text-xl font-semibold">
                    Wait while we research the web for you
                  </p>
                </div>
              )}
              {isThinking && (
                <div className="text-charcoal-black flex flex-col items-center text-xl font-semibold">
                  <div className="flex items-center gap-2">
                    <p>Thinking</p>
                    <ThreeDots
                      visible={true}
                      height="40"
                      width="40"
                      color="#902c14"
                      radius="9"
                      ariaLabel="three-dots-loading"
                    />
                  </div>
                  <p>Analyzing search results</p>
                </div>
              )}
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => (
                  <h1
                    style={{
                      fontSize: "2.4rem",
                      fontWeight: "bold",
                      marginBottom: "2rem",
                      lineHeight: "1.2",
                      color: "#902c14",
                    }}
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginTop: "2.5rem",
                      marginBottom: "1rem",
                      borderBottom: "1px solid #902c14",
                      paddingBottom: "0.5rem",
                      width: "fit-content",
                      fontStyle: "italic",
                    }}
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      marginBottom: "1.5rem",
                    }}
                    {...props}
                  />
                ),
                li: ({ ...props }) => (
                  <li style={{ marginBottom: "0.5rem" }} {...props} />
                ),
                a: ({ ...props }) => (
                  <a style={{ color: "#1447e6 " }} target="_blank" {...props} />
                ),
              }}
            >
              {formattedContent}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIQueriesModal;
