// components/DraftEditor.js
'use client'
import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
interface DraftEditorProps {
    onChange: (content: string) => void;
}
const DraftEditor = ({ onChange }: DraftEditorProps) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const onEditorStateChange = (newState) => {
        setEditorState(newState);
        console.log(newState, '编辑器')
    };

    const handleSave = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        console.log(JSON.stringify(rawContent)); // 输出为 JSON 格式
    };
    return (
        <div>
            <Editor
                editorState={editorState}
                // onEditorStateChange={onChange}
                onChange={onEditorStateChange}
                placeholder="开始写作..."
            />
            <button onClick={handleSave}>保存</button>
        </div>
    );
};

export default DraftEditor;