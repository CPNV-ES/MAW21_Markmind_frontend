import React from 'react';
import style from './editorSetting.module.scss';
import { useEditorOptions } from '../../providers/EditorOptionsProvider';

export default function EditorSetting({ exportToPDF }) {
    const { editorSettings, updateEditorSettings } = useEditorOptions();

    const handleChange = (key, value) => {
        updateEditorSettings(key, value);
    };

    return (
        <div className={style.settingsModal}>
            <ul className={style.settingsModal__list}>
                <li className={style.settingsModal__list__item}>
                    <input
                        type='checkbox'
                        checked={editorSettings.autoSave}
                        onChange={(e) => handleChange('autoSave', e.target.checked)}
                    /> Auto Save
                </li>
                <li className={style.settingsModal__list__item}>
                    <label>Save Interval</label>
                    <input
                        type='number'
                        value={editorSettings.saveInterval}
                        onChange={(e) => handleChange('saveInterval', parseInt(e.target.value, 10))}
                    />
                </li>
                <li className={style.settingsModal__list__item}>
                    <label>Font Size</label>
                    <input
                        type='number'
                        value={parseInt(editorSettings.fontSize, 10)}
                        onChange={(e) => handleChange('fontSize', `${e.target.value}px`)}
                    />
                </li>
                <li className={style.settingsModal__list__item}>
                    <label>Font Family</label>
                    <input
                        type='text'
                        value={editorSettings.fontFamily}
                        onChange={(e) => handleChange('fontFamily', e.target.value)}
                    />
                </li>
                <li className={style.settingsModal__list__item}>
                    <label>Background Color</label>
                    <input
                        type='color'
                        value={editorSettings.backgroundColor}
                        onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    />
                </li>
                <li>
                    <label>Export to PDF </label>
                    <button onClick={exportToPDF}>Export</button>
                </li>
            </ul>
        </div>
    );
}
