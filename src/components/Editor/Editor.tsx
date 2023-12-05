import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import editorStyle from './Editor.module.scss'
import data from "../../data/workspace";
import EditorToolsBar from './EditorToolsBar';



export default function Editor() {
    const [editorState, setEditorState] = useState(data.collections[0].resources[0].content);
    const [html, setHtml] = useState('');
    const [selectedText, setSelectedText] = useState('');

    useEffect(() => {
        async function parseMarkdown() {
            const content = await editorState;
            const rawHtml = marked.parse(content);
            setHtml(rawHtml);
        }
        parseMarkdown();
    }, [editorState]);

    useEffect(() => {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        setSelectedText(selectedText);
    }, [html]);

    const handleTextChange = (e) => {
  
    }

    return (
      <>
        <div className={editorStyle.editor} dangerouslySetInnerHTML={{ __html: html }} contentEditable/>

        <EditorToolsBar handleTextChange={handleTextChange}/>
      </>
        
    );
}
