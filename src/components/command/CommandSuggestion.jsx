import React, { useEffect, useState } from 'react';
import style from './commandSuggestion.module.scss';

export default function CommandSuggestion({ command, onSelect, onClose }) {
    const commands = [
        { trigger: "divider", markdown: "---" },
        { trigger: "title1", markdown: "#" },
        { trigger: "todo", markdown: "- [ ]" },
        { trigger: "bold", markdown: "**" },
        { trigger: "italic", markdown: "*" },
        { trigger: "table", markdown: "| Column 1 | Column 2 |\n| -------- | -------- |\n| Text     | Text     |" },
        { trigger: "code", markdown: "```" },
        { trigger: "link", markdown: "[Link](http://)" },
        { trigger: "image", markdown: "![Alt text](http://)" },
        { trigger: "quote", markdown: "> " },
        { trigger: "list", markdown: "- " },
        { trigger: "numbered list", markdown: "1. " },
        { trigger: "bullet list", markdown: "- " },
    ];

    const [filteredCommands, setFilteredCommands] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const getCursorPos = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return { x: 0, y: 0 };
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect) {
            return {
                x: rect.left + window.scrollX,
                y: rect.bottom + window.scrollY
            };
        }
        return { x: 0, y: 0 };
    };

    useEffect(() => {
        const newFilteredCommands = commands.filter(c => c.trigger.startsWith(command));
        setFilteredCommands(newFilteredCommands);
        setSelectedIndex(0);

        setTimeout(() => {
            setCursorPos(getCursorPos());
        }, 0);
    }, [command]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter" && filteredCommands.length > 0) {
                onSelect(filteredCommands[selectedIndex].markdown);
            } else if (event.key === "Escape") {
                onClose();
            } else if (event.key === "ArrowDown") {
                setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredCommands.length - 1));
            } else if (event.key === "ArrowUp") {
                setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [filteredCommands, selectedIndex, onSelect, onClose]);


    return (
        <ul style={{ position: 'absolute', left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, opacity: 1 }} className={style.commandSuggestions} >
            {filteredCommands.map((cmd, index) => (
                <li key={index} onClick={() => onSelect(cmd.markdown)}>
                    {cmd.trigger}
                </li>
            ))}
        </ul>
    );
}
