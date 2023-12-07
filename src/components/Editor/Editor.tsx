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


  useEffect(() => {
    formatMarkdown();

  }, [editorState]);


  const handleTextChange = (format, option) => {
    // ajoute le format markdown au texte sélectionné à partir du tableau de format
    if (format.length > 0 && selectedText.length > 0) {
      let newFormatedText = ""
      format.forEach((format) => {
        switch (format) {
          case "B":
            newFormatedText = `**${selectedText}**`
            break;
          case "I":
            newFormatedText = `*${selectedText}*`
            break;
          case "U":
            newFormatedText = `<u>${selectedText}</u>`
            break;
          case "LINK":
            newFormatedText = `[${selectedText}](${option})`
            break;
          case "IMAGE":
            newFormatedText = `![${selectedText}](${option})`
            break;
          case "CODE":
            newFormatedText = `\`\`\`${selectedText}\`\`\``
            break;
          default:
            break;
        }
      })
      setEditorState(editorState.replace(selectedText, newFormatedText));
    }
  }

  return (
    <>
      <div className={editorStyle.editor} dangerouslySetInnerHTML={{ __html: html }} contentEditable ref={textDivRef} onMouseUp={handleMouseUp} style={{ cursor: 'text' }} />

      <EditorToolsBar handleTextChange={handleTextChange} />
    </>

  );
}
