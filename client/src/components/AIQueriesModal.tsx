import { IoMdClose } from "react-icons/io";
import type { PerplexityResearchResult } from "../types/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AIQueriesModalProps {
  selectedResearch: PerplexityResearchResult;
  onClose: () => void;
}

const AIQueriesModal = ({ selectedResearch, onClose }: AIQueriesModalProps) => {
  const formattedContent =
    selectedResearch.research.choices[0].message.content.replace(
      /<think>[\s\S]*?<\/think>/g,
      "",
    );

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="bg-dark-parchment relative z-50 h-[600px] w-full max-w-[800px] rounded-lg p-6 pt-16"
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          className="absolute top-4 right-4 size-6 cursor-pointer"
          onClick={onClose}
        />
        <div className="text-charcoal-black h-full overflow-y-scroll rounded-lg border px-6 py-4">
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
            }}
          >
            {formattedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AIQueriesModal;
