import "../editorStyles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEditorStore } from "../store/use-editor";
import TextAlign from "@tiptap/extension-text-align";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import Blockquote from "@tiptap/extension-blockquote";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";

const TiptapEditor = () => {
  const setEditor = useEditorStore((state) => state.setEditor);

  const editor = useEditor({
    onCreate: ({ editor }) => setEditor(editor),
    onDestroy: () => setEditor(null),
    onUpdate: ({ editor }) => setEditor(editor),
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    onTransaction: ({ editor }) => setEditor(editor),
    onFocus: ({ editor }) => setEditor(editor),
    onBlur: ({ editor }) => setEditor(editor),
    onContentError: ({ editor }) => setEditor(editor),
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
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="min-h-screen w-full max-w-[800px] bg-white">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
