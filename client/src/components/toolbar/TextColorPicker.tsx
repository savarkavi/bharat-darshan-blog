import { SketchPicker, type ColorResult } from "react-color";
import { DropdownMenu } from "../common/Dropdown";
import { IoColorPaletteOutline } from "react-icons/io5";
import { useEditorStore } from "../../store/use-editor";

const TextColorPicker = () => {
  const editor = useEditorStore((state) => state.editor);
  const isActive = editor?.isActive("highlight");

  const onColorChange = (color: ColorResult) => {
    editor?.commands.setColor(color.hex);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <button
          className={`hover:bg-light-parchment cursor-pointer rounded-md p-1 ${isActive && "bg-light-parchment"} `}
        >
          <IoColorPaletteOutline className="size-5" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <SketchPicker
          color={editor?.getAttributes("textStyle").color || "#000000"}
          onChange={onColorChange}
          className="justify-center"
        />
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default TextColorPicker;
