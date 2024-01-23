import React from 'react'

export default function EditorToolsBarOption(handleOption) {

    const handleOption = (e) => {
        handleOption(e.target.value)
    }

    return (
        <div>
            <input type='text' onChange={handleOption} />
        </div>
    )
}
