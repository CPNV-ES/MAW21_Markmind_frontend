
import React, { useState, useRef, Component, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { markdownToDraft } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import editorStyle from './Editor.module.scss';
import { Settings } from 'lucide-react';
import EditorSetting from '../editorSettings/EditorSetting';
import CommandSuggestion from '../command/CommandSuggestion';
import { Resource } from '../../models/resource';
import { useParams } from 'react-router-dom';
import { useEditorOptions } from '../../providers/EditorOptionsProvider';
import { marked } from 'marked';
import jsPDF from 'jspdf';


export default function MarkdownEditor() {
  /* STATE */
  const { resourceId } = useParams();
  const [isContentChanged, setIsContentChanged] = useState(false);

  const [markdown, setMarkdown] = useState('');
  const { editorSettings, updateEditorSettings } = useEditorOptions();


  const [showCommands, setShowCommands] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  /* FUNCTIONS */
  const debounce = (func, wait) => {
    let timeout;
    const executedFunction = function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };

    executedFunction.cancel = () => clearTimeout(timeout);

    return executedFunction;
  };

  const exportToPDF = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const markdown = draftToMarkdown(rawContent);
    const htmlContent = marked(markdown);


    const styledHtml = `
    <div style="font-size: 12px; max-width: 180mm;">
      ${htmlContent}
    </div>
  `;

    const doc = new jsPDF();

    doc.html(styledHtml, {
      callback: function (doc) {
        doc.save('document.pdf');
      },
      windowWidth: doc.internal.pageSize.getWidth(),
      x: 10,
      y: 10
    });
  };

  const handleEditorStateChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const markdownOutput = draftToMarkdown(rawContent);

    const selectionState = newEditorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentBlock = contentState.getBlockForKey(anchorKey);
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

    setMarkdown(markdownOutput);
    setIsContentChanged(true);

    setEditorState(newEditorState);
  };


  const handleCommandSelect = (markdownCommand) => {
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const blockKey = selectionState.getStartKey();
    const blockText = currentContent.getBlockForKey(blockKey).getText();
    const slashIndex = blockText.lastIndexOf("/", selectionState.getStartOffset());

    if (slashIndex !== -1) {
      const newSelectionState = selectionState.merge({
        anchorOffset: slashIndex,
        focusOffset: selectionState.getStartOffset(),
      });

      const rawDraftContent = markdownToDraft(markdownCommand);

      if (rawDraftContent) {
        const contentState = convertFromRaw(rawDraftContent);

        if (contentState.getBlockMap().size > 0) {
          const firstBlockText = contentState.getBlockMap().first().getText();

          const newContentState = Modifier.replaceText(
            currentContent,
            newSelectionState,
            firstBlockText
          );

          let newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');

          const finalSelection = newEditorState.getSelection().merge({
            anchorOffset: slashIndex + firstBlockText.length,
            focusOffset: slashIndex + firstBlockText.length,
          });
          newEditorState = EditorState.forceSelection(newEditorState, finalSelection);
          setEditorState(newEditorState);
        } else {
          console.error("Le contenu converti ne contient pas de blocs.");
        }
      } else {
        console.error("Erreur lors de la conversion du markdown en contenu Draft.js.");
      }
      setShowCommands(false);
      setCurrentCommand("");
    }
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
    if (!isContentChanged) return;
    try {
      await Resource.update(parseInt(resourceId) || 2, { content: markdown });
      setIsContentChanged(false);

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
    updateEditorSettings('isOpen', !editorSettings.isOpen);
  };

  /* UseEffect */


  useEffect(() => {
    (async () => {
      const resource = await Resource.getOne(parseInt(resourceId) || 2);
      if (resource && resource.content) {
        setEditorState(EditorState.createWithContent(convertFromRaw(markdownToDraft(resource.content))));
      }

    })();
  }, [resourceId]);


  useEffect(() => {
    const debounceSave = debounce(() => {
      saveContent();
    }, editorSettings.saveInterval * 1000);

    if (isContentChanged) {
      debounceSave();
    }
    return () => debounceSave.cancel();
  }, [markdown, isContentChanged]);



  useEffect(() => {
    const handleSave = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveContent();
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
        editorSettings.isOpen && <EditorSetting exportToPDF={exportToPDF} />
      }
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName={editorStyle.toolbar}
        wrapperClassName={editorStyle.customEditor}
        toolbarOnFocus
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'link', 'emoji', 'image'],
          image: {
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          },
        }}
        editorStyle={{
          backgroundColor: editorSettings.backgroundColor,
          color: editorSettings.textColor,
          fontSize: editorSettings.fontSize,
          fontFamily: editorSettings.fontFamily,
        }}
      />
      {
        showCommands && (
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
          />
        )
      }
    </>

  );
};