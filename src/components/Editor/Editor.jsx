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
import CommandSuggestion from './CommandSuggestion';
import { Resource } from '../../models/resource';
import { useParams } from 'react-router-dom';


export default function MarkdownEditor() {

  const [contentEditorText, setContentEditorText] = useState('');

  /* STATE */
  const { resourceId } = useParams();

  const [markdown, setMarkdown] = useState('');
  const [editorSettings, setEditorSettings] = useState({
    isOpen: false,
    autoSave: true,
    saveInterval: 10,
    backgroundColor: '#000',
    textColor: '#000',
    fontSize: '16px',
    fontFamily: 'Arial',
  });
  const [showCommands, setShowCommands] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());




  /* FUNCTIONS */

  const handleEditorStateChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const markdownOutput = draftToMarkdown(rawContent);
    setContentEditorText(markdownOutput);

    console.log("Markdown Output:", markdownOutput);
    setMarkdown(markdownOutput);

    setEditorState(newEditorState);
  };




  /*const handleEditorStateChange = (newEditorState) => {
    const currentContent = newEditorState.getCurrentContent();
    const selectionState = newEditorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();
    const startOffset = selectionState.getStartOffset();

    const slashIndex = blockText.lastIndexOf("/", startOffset);

    if (slashIndex !== -1) {
      const command = blockText.slice(slashIndex + 1, startOffset);
      setShowCommands(true);
      setCurrentCommand(command);
    } else {
      setShowCommands(false);
    }

    setEditorState(newEditorState);
  };*/

  const getCursorPos = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return { x: 0, y: 0 };
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) {
      return { x: rect.left, y: rect.bottom };
    }
    return { x: 0, y: 0 };
  };

  const getMarkdownOutput = () => {
    const content = editorState.getCurrentContent();

    if (!content.hasText()) {
      return '';
    }
    const rawContent = convertToRaw(content);
    const markdownOutput = draftToMarkdown(rawContent);
    return markdownOutput;
  };

  const saveContent = async () => {
    try {
      console.log(contentEditorText);
      await Resource.update(parseInt(resourceId) || 2, { content: contentEditorText });
    } catch (error) {
      console.error(error);
    }
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

  /* UseEffect */

  useEffect(() => {
    saveContent();
  }, [contentEditorText]);

  useEffect(() => {
    (async () => {
      const resource = await Resource.getOne(parseInt(resourceId) || 2);
      if (resource && resource.content) {
        setEditorState(EditorState.createWithContent(convertFromRaw(markdownToDraft(resource.content))));
      }
    })();
  }, [resourceId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (editorSettings.autoSave) {
        saveContent();
      }
      else {
        console.log("Auto Save is off");
        clearInterval(interval);
      }
    }, editorSettings.saveInterval * 10000);

    return () => clearInterval(interval);
  }, [editorSettings]);

  useEffect(() => {
    const handleSave = async (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        await saveContent();
      }
    };
    document.addEventListener('keydown', handleSave);
    return () => document.removeEventListener('keydown', handleSave);
  }, []);

  return (
    <>
      <div className={editorStyle.settings}>
        <button onClick={toggleSettings}> <Settings /> </button>
      </div>
      {
        editorSettings.isOpen && <EditorSetting settings={editorSettings} onSettingsChange={handleSettingsChange} />
      }
      <Editor style={{ backgroundColor: editorSettings.backgroundColor, color: editorSettings.textColor, fontSize: editorSettings.fontSize, fontFamily: editorSettings.fontFamily }}
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
};