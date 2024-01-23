import React, { useEffect, useState, useRef } from 'react';
import { marked, use } from 'marked';
import editorStyle from './Editor.module.scss'
import data from "../../data/workspace";
import EditorToolsBar from './EditorToolsBar';



export default function Editor() {
  const [editorState, setEditorState] = useState(data.collections[0].resources[0].content);
  const [html, setHtml] = useState('');


  const textDivRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');

  const handleMouseUp = () => {
    if (textDivRef.current && window.getSelection) {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      setSelectedText(selectedText);
    }
  };
  const formatMarkdown = async () => {
    const content = await editorState;
    const rawHtml = marked.parse(content);
    setHtml(rawHtml);
  }

  const isFormatted = (text, format) => {
    const regex = new RegExp(`^${format}.*${format}$`);
    return regex.test(text);
  };

  const toggleFormat = (text, format) => {
    if (isFormatted(text, format)) {
      return text.replace(new RegExp(format, 'g'), '');
    }
    return `${format}${text}${format}`;
  };
  const handleKeepTextFormat = (text, format) => {
    switch (format) {
      case 'B':
        return toggleFormat(text, '**');
      case 'I':
        return toggleFormat(text, '*');
      case 'U':
        return isFormatted(text, '<u>') ? text.replace(/<\/?u>/g, '') : `<u>${text}</u>`;
      default:
        return text;
    }
  };

  useEffect(() => {
    formatMarkdown();

  }, [editorState]);


  const handleTextChange = async (format, option) => {
    if (format.length > 0 && selectedText.length > 0) {
      let newFormattedText = selectedText;
      format.forEach((f) => {
        newFormattedText = handleKeepTextFormat(newFormattedText, f);
      });
      setEditorState(editorState.replace(selectedText, newFormattedText));
    }
  };

  return (
    <>
      <div className={editorStyle.editor} dangerouslySetInnerHTML={{ __html: html }} contentEditable ref={textDivRef} onMouseUp={handleMouseUp} style={{ cursor: 'text' }} />

      <EditorToolsBar handleTextChange={handleTextChange} />
    </>

  );
}
