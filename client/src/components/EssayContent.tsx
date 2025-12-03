import type { Author, Blog } from "../types/types";

interface EssayContentProps {
  blog: Blog<Author>;
}

const EssayContent = ({ blog }: EssayContentProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[1360px] gap-8 py-24">
      {/* <div className="flex-[30%]"></div> */}
      <div className="mx-auto max-w-[900px]">
        <div
          className="text-3xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default EssayContent;
