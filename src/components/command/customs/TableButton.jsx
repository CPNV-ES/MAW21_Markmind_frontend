import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


const TableRenderer = ({ block }) => {
    const text = block.getText();
    if (text.startsWith('startTable') && text.endsWith('endTable')) {
        const parts = text.split('|').slice(1, -1);
        const rows = parseInt(parts[0], 10);
        const columns = parseInt(parts[1], 10);
        const data = parts.slice(2);

        let tableRows = [];
        for (let i = 0; i < rows; i++) {
            let rowData = data.slice(i * columns, (i + 1) * columns);
            tableRows.push(rowData);
        }

        return (
            <table>
                <tbody>
                    {tableRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return null;
};

export default TableRenderer;