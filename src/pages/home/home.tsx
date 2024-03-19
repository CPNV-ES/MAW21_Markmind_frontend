import { EditorOptionsProvider } from "../../providers/EditorOptionsProvider.jsx";
import Editor from "../../components/editor/Editor";
import React from "react";
import { useParams } from "react-router-dom";

export default function Home() {
  const { workspaceId } = useParams();
  return (
    <EditorOptionsProvider>
      <Editor />
    </EditorOptionsProvider>
  )
}