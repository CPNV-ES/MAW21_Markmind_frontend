import React, { useEffect, useState } from 'react'
import style from './editorToolsBar.module.scss'

export default function EditorToolsBar({handleTextChange}) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [link, setLink] = useState(false);
  const [image, setImage] = useState(false);
  const [code, setCode] = useState(false);
  
  const handleBold = () => {
    setBold(!bold);
  }
  const handleItalic = () => {
    setItalic(!italic);
  }
  const handleUnderline = () => {
    setUnderline(!underline);
  }
  const handleLink = () => {
    setLink(!link);
  }
  const handleImage = () => {
    setImage(!image);
  }
  const handleCode = () => {
    setCode(!code);
  }

  useEffect(() => {
    handleTextChange()
  })


  return (
    <div className={style.editorToolbar}>
      <ul className={style.editorToolbar__list}>
        <li className={style.editorToolbar__list__item} onClick={handleBold}>B</li>
        <li className={style.editorToolbar__list__item} onClick={handleItalic}>I</li>
        <li className={style.editorToolbar__list__item} onClick={handleUnderline}>U</li>
        <li className={style.editorToolbar__list__item} onClick={handleLink}>Link</li>
        <li className={style.editorToolbar__list__item} onClick={handleImage}>Image</li>
        <li className={style.editorToolbar__list__item} onClick={handleCode}>Code</li>
      </ul>
    </div>
  )
}
