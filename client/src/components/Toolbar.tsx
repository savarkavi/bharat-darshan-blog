import { useEditorStore } from "../store/use-editor";
import { BiUndo, BiRedo } from "react-icons/bi";
import { ImBold, ImItalic, ImUnderline, ImStrikethrough } from "react-icons/im";
import ToolbarButton from "./toolbar/ToolbarButton";
import TextHighlighter from "./toolbar/TextHighlighter";
import TextColorPicker from "./toolbar/TextColorPicker";
import HeadingsButton from "./toolbar/HeadingsButton";
import ListButton from "./toolbar/ListButton";
import { MdOutlineAlignHorizontalLeft } from "react-icons/md";
import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignRight,
  CiTextAlignJustify,
} from "react-icons/ci";

const Toolbar = () => {
  const { editor } = useEditorStore();

  const Separator = () => {
    return <div className="h-5 w-px bg-gray-500"></div>;
  };

  const sections = [
    [
      {
        label: "undo",
        icon: BiUndo,
        onClick: () => editor?.commands.undo(),
      },
      {
        label: "redo",
        icon: BiRedo,
        onClick: () => editor?.commands.redo(),
      },
    ],
    [
      {
        label: "bold",
        icon: ImBold,
        iconSize: "size-4",
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.commands.toggleBold(),
      },
      {
        label: "italic",
        icon: ImItalic,
        iconSize: "size-4",
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.commands.toggleItalic(),
      },
      {
        label: "underline",
        icon: ImUnderline,
        iconSize: "size-4",
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.commands.toggleUnderline(),
      },
      {
        label: "strikethrough",
        icon: ImStrikethrough,
        iconSize: "size-4",
        isActive: editor?.isActive("strike"),
        onClick: () => editor?.commands.toggleStrike(),
      },
    ],
    [
      {
        label: "alignLeft",
        icon: CiTextAlignLeft,
        iconSize: "size-4",
        isActive: editor?.isActive({ textAlign: "left" }),
        onClick: () => editor?.commands.toggleTextAlign("left"),
      },
      {
        label: "alignCenter",
        icon: CiTextAlignCenter,
        iconSize: "size-4",
        isActive: editor?.isActive({ textAlign: "center" }),
        onClick: () => editor?.commands.toggleTextAlign("center"),
      },
      {
        label: "alignRight",
        icon: CiTextAlignRight,
        iconSize: "size-4",
        isActive: editor?.isActive({ textAlign: "right" }),
        onClick: () => editor?.commands.toggleTextAlign("right"),
      },
      {
        label: "alignJustify",
        icon: CiTextAlignJustify,
        iconSize: "size-4",
        isActive: editor?.isActive({ textAlign: "justify" }),
        onClick: () => editor?.commands.toggleTextAlign("justify"),
      },
    ],
  ];

  return (
    <div className="bg-dark-parchment p-2">
      <div className="mx-auto flex max-w-[800px] items-center gap-6">
        <div className="flex items-center gap-3">
          {sections[0].map((item) => (
            <ToolbarButton key={item.label} {...item} />
          ))}
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <HeadingsButton />
          <ListButton />
          <ToolbarButton
            icon={MdOutlineAlignHorizontalLeft}
            iconSize="5"
            isActive={editor?.isActive("blockquote")}
            onClick={() => editor?.commands.toggleBlockquote()}
          />
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          {sections[1].map((item) => (
            <ToolbarButton key={item.label} {...item} />
          ))}
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <TextHighlighter />
          <TextColorPicker />
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          {sections[2].map((item) => (
            <ToolbarButton key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
