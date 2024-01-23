import React, { useState, useRef } from 'react';
import editorStyle from './Editor.module.scss';
import data from "../../data/workspace";
import {
  MDXEditor, toolbarPlugin, listsPlugin, quotePlugin, headingsPlugin, linkPlugin, linkDialogPlugin, imagePlugin, tablePlugin, thematicBreakPlugin, frontmatterPlugin, codeBlockPlugin, sandpackPlugin, codeMirrorPlugin, directivesPlugin, diffSourcePlugin, markdownShortcutPlugin, UndoRedo, BoldItalicUnderlineToggles,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(data.collections[0].resources[0].content);

  const handleMarkdownChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  return (
    <MDXEditor
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin()]}
      onChange={handleMarkdownChange}
    />
  );
};

export default MarkdownEditor;
