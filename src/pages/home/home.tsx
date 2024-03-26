import { useParams } from "react-router-dom";
import Editor from "../../components/editor/Editor.jsx";
import { EditorOptionsProvider } from "../../providers/EditorOptionsProvider.jsx";

export default function Home() {
  const { workspaceId } = useParams();
  return (
    <EditorOptionsProvider>
      <Editor />
    </EditorOptionsProvider>
  );
}
