import React from 'react'

export default function EditorSetting({ settings }) {
    return (
        <div>
            <ul>
                <li><input type='checkbox' value={settings.autoSave} /> Sauvegarder</li>
            </ul>
        </div>
    )
}
