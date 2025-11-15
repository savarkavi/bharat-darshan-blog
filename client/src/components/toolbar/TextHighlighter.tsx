import { LuHighlighter } from "react-icons/lu";
import { DropdownMenu } from "../common/Dropdown";
import { CirclePicker, type ColorResult } from "react-color";
import { useEditorStore } from "../../store/use-editor";

const TextHighlighter = () => {
  const editor = useEditorStore((state) => state.editor);
  const isActive = editor?.isActive("highlight");

  const onHighlight = (color: ColorResult) => {
    editor?.commands.toggleHighlight({ color: color.hex });
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <button
          className={`hover:bg-light-parchment cursor-pointer rounded-md p-1 ${isActive && "bg-light-parchment"} `}
        >
          <LuHighlighter className="size-5" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <CirclePicker
          colors={["#FFF952", "#B7FF5C", "#FF6EC7", "#FFB55A", "#7DE5FF"]}
          className="justify-center"
          circleSize={28}
          styles={{
            default: {
              card: {
                marginTop: 0,
                padding: 0,
                alignItems: "center",
              },
            },
          }}
          color={editor?.getAttributes("highlight").color || "#ffffff"}
          onChange={onHighlight}
        />
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default TextHighlighter;
