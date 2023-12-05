import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import editorStyle from './Editor.module.scss'
import data from "../../data/workspace";



export default function Editor() {
    const [editorState, setEditorState] = useState(data.collections[0].resources[0].content);
    const [html, setHtml] = useState('');


    useEffect(() => {
        async function parseMarkdown() {
            const content = await editorState;
            const rawHtml = marked.parse(content);
            setHtml(rawHtml);
        }
        parseMarkdown();
    }, [editorState]);

    return (
        <div className={editorStyle.editor} dangerouslySetInnerHTML={{ __html: html }} />
    );
}
