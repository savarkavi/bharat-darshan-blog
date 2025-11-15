import { DropdownMenu } from "../common/Dropdown";
import { FaHeading } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";
import { useEditorStore } from "../../store/use-editor";
import { type Level } from "@tiptap/extension-heading";
import { cn } from "../../lib/utils";

const HeadingsButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const isActive = editor?.isActive("heading");

  const headings = [
    { label: "Heading 1", value: 1, icon: <LuHeading1 /> },
    { label: "Heading 2", value: 2, icon: <LuHeading2 /> },
    { label: "Heading 3", value: 3, icon: <LuHeading3 /> },
    { label: "Heading 4", value: 4, icon: <LuHeading4 /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <button
          className={`hover:bg-light-parchment flex cursor-pointer items-center rounded-md p-1 ${isActive && "bg-light-parchment"} `}
        >
          <FaHeading />
          <IoChevronDown className="size-3" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content classNames="px-1 py-2">
        <div className="flex w-fit flex-col gap-1">
          {headings.map((heading) => (
            <div
              key={heading.label}
              className={cn(
                "hover:bg-light-parchment flex cursor-pointer items-center gap-3 rounded-md px-3 py-1",
                editor?.isActive("heading", {
                  level: heading.value,
                }) && "bg-light-parchment",
              )}
              onClick={() =>
                editor?.commands.toggleHeading({
                  level: heading.value as Level,
                })
              }
            >
              <div>{heading.icon}</div>
              <p className="text-nowrap">{heading.label}</p>
            </div>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default HeadingsButton;
