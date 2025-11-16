import type { IconType } from "react-icons/lib";
import { useEditorStore } from "../../store/use-editor";
import { useEditorState } from "@tiptap/react";
import { cn } from "../../lib/utils";

interface UndoRedoButtonProps {
  label: string;
  icon: IconType;
  iconSize?: string;
  onClick: () => void;
}

const UndoRedoButton = ({
  label,
  icon: Icon,
  iconSize,
  onClick,
}: UndoRedoButtonProps) => {
  const editor = useEditorStore((state) => state.editor);

  const { canUndo, canRedo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  }) ?? { canUndo: false, canRedo: false };

  if (label === "undo") {
    return (
      <button
        onClick={onClick}
        disabled={!canUndo}
        type="button"
        className={cn(
          "rounded-md p-1",
          canUndo && "hover:bg-light-parchment cursor-pointer",
        )}
      >
        <Icon
          className={cn(
            iconSize ? iconSize : "size-5",
            !canUndo && "cursor-auto text-gray-500",
          )}
        />
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        disabled={!canRedo}
        type="button"
        className={cn(
          "rounded-md p-1",
          canRedo && "hover:bg-light-parchment cursor-pointer",
        )}
      >
        <Icon
          className={cn(
            iconSize ? iconSize : "size-5",
            !canRedo && "cursor-auto text-gray-500",
          )}
        />
      </button>
    );
  }
};

export default UndoRedoButton;
