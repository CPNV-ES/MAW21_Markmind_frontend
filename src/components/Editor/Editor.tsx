import React, { useState } from 'react'
import data from "../../data/workspace";
import EditorToolsBar from './EditorToolsBar';

export default function Editor() {
    const [editorState, setEditorState] = useState(data.collections[0].resources[0].content)
  return (
    <div className='editor'>
        <textarea value={editorState} onChange={(e) => setEditorState(e.target.value)} />
        <EditorToolsBar />
    </div>
  )
}
