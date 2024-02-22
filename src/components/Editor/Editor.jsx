import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import { Settings } from "lucide-react";
import { markdownToDraft } from "markdown-draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import data from "../../data/workspace";
import CommandSuggestion from "./CommandSuggestion";
import editorStyle from "./Editor.module.scss";
import EditorSetting from "./EditorSetting";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    data.collections[0].resources[0].content
  );
  const [editorSettings, setEditorSettings] = useState({
    isOpen: false,
    autoSave: true,
    saveInterval: 10,
    backgroundColor: "#000",
    textColor: "#000",
    fontSize: "16px",
    fontFamily: "Arial",
  });
  const [showCommands, setShowCommands] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");

  const [editorState, setEditorState] = useState(() => {
    const content = markdownToDraft(markdown);
    return EditorState.createWithContent(convertFromRaw(content));
  });

  const handleEditorStateChange = (newEditorState) => {
    const currentContent = newEditorState.getCurrentContent();
    const selectionState = newEditorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();
    const startOffset = selectionState.getStartOffset();

    // Trouver la position du dernier "/" dans le bloc de texte.
    const slashIndex = blockText.lastIndexOf("/", startOffset);

    if (slashIndex !== -1) {
      const command = blockText.slice(slashIndex + 1, startOffset);
      setShowCommands(true);
      setCurrentCommand(command);
    } else {
      setShowCommands(false);
    }

    setEditorState(newEditorState);
  };

  const getCursorPos = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return { x: 0, y: 0 };
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) {
      return { x: rect.left, y: rect.bottom }; // Position en bas à gauche du curseur
    }
    return { x: 0, y: 0 };
  };

  const getMarkdownOutput = () => {
    const content = editorState.getCurrentContent();
    return draftToMarkdown(convertToRaw(content));
  };

  const saveContent = () => {
    setMarkdown(getMarkdownOutput());
    console.log("Saved");
  };

  const handleSettingsChange = (autoSaveValue) => {
    setEditorSettings((prevSettings) => ({
      ...prevSettings,
      autoSave: autoSaveValue,
    }));
  };
  const toggleSettings = () => {
    setEditorSettings({ ...editorSettings, isOpen: !editorSettings.isOpen });
    console.log("Is Open:", !editorSettings.isOpen);
  };

  //useEffect to save content all 10 seconds and if content is changed
  useEffect(() => {
    const interval = setInterval(() => {
      editorSettings.autoSave && saveContent();
    }, 10000);
    return () => clearInterval(interval);
  }, [markdown]);

  return (
    <>
      <div className={editorStyle.settings}>
        <button onClick={toggleSettings}>
          {" "}
          <Settings />{" "}
        </button>
      </div>
      {editorSettings.isOpen && (
        <EditorSetting
          settings={editorSettings}
          onSettingsChange={handleSettingsChange}
        />
      )}
      <Editor
        style={{
          backgroundColor: editorSettings.backgroundColor,
          color: editorSettings.textColor,
          fontSize: editorSettings.fontSize,
          fontFamily: editorSettings.fontFamily,
        }}
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName={editorStyle.toolbar}
        wrapperClassName={editorStyle.customEditor}
        toolbarOnFocus
      />
      {showCommands && (
        <CommandSuggestion
          command={currentCommand}
          onSelect={(markdown) => {
            handleCommandSelect(markdown);
            setShowCommands(false);
            setCurrentCommand("");
          }}
          onClose={() => {
            setShowCommands(false);
            setCurrentCommand("");
          }}
          position={getCursorPos()}
        />
      )}
    </>
  );
}
