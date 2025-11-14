import "../editorStyles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useEditorStore } from "../store/use-editor";

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
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="h-screen w-full max-w-[800px] bg-white">
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default TiptapEditor;
