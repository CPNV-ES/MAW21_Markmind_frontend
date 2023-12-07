import React, { useEffect, useState } from 'react'
import style from './editorToolsBar.module.scss'

export default function EditorToolsBar({ handleTextChange }) {
  const [handleFormat, setHandleFormat] = useState([]);

  const handleFormatList = (format) => {
    if (handleFormat.includes(format)) {
      const newList = handleFormat.filter((item) => item !== format);
      setHandleFormat(newList);
    }
    else {
      setHandleFormat([...handleFormat, format]);
    }
  }

  useEffect(() => {
    handleTextChange(handleFormat);
  }, [handleFormat]);

  return (
    <div className={style.editorToolbar}>
      <ul className={style.editorToolbar__list}>
        <li className={style.editorToolbar__list__item} onClick={() => handleFormatList("B")}>B</li>
        <li className={style.editorToolbar__list__item} onClick={() => handleFormatList("I")}>I</li>
        <li className={style.editorToolbar__list__item} onClick={() => handleFormatList("U")}>U</li>
        <li className={style.editorToolbar__list__item} onClick={() => handleFormatList("LINK")}>Link</li>
        <li className={style.editorToolbar__list__item} onClick={() => handleFormatList("IMAGE")}>Image</li>
        <li className={style.editorToolbar__list__item} onClick={() => handleFormatList("CODE")}>Code</li>
      </ul>
    </div>
  )
}
