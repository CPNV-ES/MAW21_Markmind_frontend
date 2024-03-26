import Editor from "@/components/editor/Editor.jsx";
import { EditorOptionsProvider } from "@/providers/EditorOptionsProvider";

export default function Home() {
  return (
    <EditorOptionsProvider>
      <Editor />
    </EditorOptionsProvider>
  );
}
