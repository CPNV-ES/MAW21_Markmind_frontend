import React, { createContext, useState, useContext, useEffect } from 'react';

const EditorOptionsContext = createContext();

export function useEditorOptions() {
    return useContext(EditorOptionsContext);
}

export const EditorOptionsProvider = ({ children }) => {
    const defaultSettings = {
        isOpen: false,
        autoSave: true,
        saveInterval: 2,
        backgroundColor: '#fff',
        textColor: '#000',
        fontSize: '16px',
        fontFamily: 'Arial',
    };

    const [editorSettings, setEditorSettings] = useState(() => {
        const localData = localStorage.getItem('editorSettings');
        return localData ? JSON.parse(localData) : defaultSettings;
    });

    const updateEditorSettings = (key, value) => {
        setEditorSettings(prevSettings => {
            const newSettings = { ...prevSettings, [key]: value };
            localStorage.setItem('editorSettings', JSON.stringify(newSettings));
            return newSettings;
        });
    };

    useEffect(() => {
        const localData = localStorage.getItem('editorSettings');
        if (localData) {
            setEditorSettings(JSON.parse(localData));
        }
    }, []);

    return (
        <EditorOptionsContext.Provider value={{ editorSettings, updateEditorSettings }}>
            {children}
        </EditorOptionsContext.Provider>
    );
};
