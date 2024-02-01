import React, { useState, useRef, Component, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { markdownToDraft } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import editorStyle from './Editor.module.scss';
import data from "../../data/workspace";
import { Settings } from 'lucide-react';
import EditorSetting from './EditorSetting';


export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(data.collections[0].resources[0].content);
  const [editorSettings, setEditorSettings] = useState({
    isOpen: false,
    autoSave: true,
    saveInterval: 10,
    backgroundColor: '#000',
    textColor: '#000',
    fontSize: '16px',
    fontFamily: 'Arial',
  });

  const [editorState, setEditorState] = useState(() => {
    const content = markdownToDraft(markdown);
    return EditorState.createWithContent(convertFromRaw(content));
  });

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const getMarkdownOutput = () => {
    const content = editorState.getCurrentContent();
    return draftToMarkdown(convertToRaw(content));
  };

  const saveContent = () => {
    setMarkdown(getMarkdownOutput());
  }

  //useEffect to save content all 10 seconds and if content is changed
  useEffect(() => {
    const interval = setInterval(() => {
      saveContent();
    }, 10000);
    return () => clearInterval(interval);
  }, [markdown]);

  return (
    <>
      <div className={editorStyle.settings}>
        <button onClick={() => setEditorSettings({ ...editorSettings, isOpen: !editorSettings.isOpen })}> <Settings /> </button>
        {editorSettings.isOpen && (
          <EditorSetting settings={editorSettings} />
        )}
      </div>
      <Editor style={{ backgroundColor: editorSettings.backgroundColor, color: editorSettings.textColor, fontSize: editorSettings.fontSize, fontFamily: editorSettings.fontFamily }}
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName={editorStyle.toolbar}
        wrapperClassName={editorStyle.customEditor}
      />
    </>

  );
};