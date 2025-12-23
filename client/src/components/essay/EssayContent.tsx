import type { Author, Blog } from "../../types/types";

interface EssayContentProps {
  blog: Blog<Author>;
}

const EssayContent = ({ blog }: EssayContentProps) => {
  return (
    <div className="flex gap-8 pt-24">
      <div className="mx-auto max-w-[800px]">
        <div
          className="text-justify text-2xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default EssayContent;
