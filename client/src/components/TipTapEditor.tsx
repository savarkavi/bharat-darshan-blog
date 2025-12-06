import "../editorStyles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEditorStore } from "../store/use-editor";
import TextAlign from "@tiptap/extension-text-align";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import Blockquote from "@tiptap/extension-blockquote";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Blog } from "../types/types";

interface TipTapEditorProps {
  data: Blog | undefined;
}

const TiptapEditor = ({ data }: TipTapEditorProps) => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate: ({ editor }) => setEditor(editor),
    onDestroy: () => setEditor(null),
    onUpdate: ({ editor }) => setEditor(editor),
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    onTransaction: ({ editor }) => setEditor(editor),
    onFocus: ({ editor }) => setEditor(editor),
    onBlur: ({ editor }) => setEditor(editor),
    onContentError: ({ editor }) => setEditor(editor),
    immediatelyRender: false,
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      TextStyleKit,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },

    content: data ? data.content : null,
  });

  return (
    <div className="mx-auto h-full w-full max-w-[800px] overflow-y-scroll bg-white">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
