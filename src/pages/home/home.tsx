import Editor from "../../components/Editor/Editor";
import React from "react";
import { useParams } from "react-router-dom";

export default function Home() {
  const { workspaceId } = useParams();
  return <Editor />;
}
