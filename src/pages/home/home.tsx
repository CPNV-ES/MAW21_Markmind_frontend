import Editor from "@/components/Editor/Editor.jsx";
import { EditorOptionsProvider } from "@/providers/EditorOptionsProvider";

export default function Home() {
  return (
    <EditorOptionsProvider>
      <Editor />
    </EditorOptionsProvider>
  );
}
