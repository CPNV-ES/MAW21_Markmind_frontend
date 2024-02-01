import React from 'react'
import style from './editorSetting.module.scss';

export default function EditorSetting({ settings, onSettingsChange }) {
    return (
        <div className={style.settingsModal}>
            <ul className={style.settingsModal__list}>
                <li className={style.settingsModal__list__item}>
                    <input
                        type='checkbox'
                        checked={settings.autoSave}
                        onChange={(e) => onSettingsChange(e.target.checked)}
                    /> Auto Save
                </li>
            </ul>
        </div>
    );
}

