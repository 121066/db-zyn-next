import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React, { useRef, useEffect } from 'react';
import { Select } from 'antd';
import './index.css'
const { Option } = Select;

const CodeBlockComponent = ({
    node: { attrs: { language: defaultLanguage } },
    updateAttributes,
    extension,
    editor
}) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                editor?.view.focus();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editor]);

    return (
        <NodeViewWrapper className="code-block" ref={wrapperRef}>
            <Select
                showSearch
                className='db-select'
                style={{ width: 150 }}
                defaultValue={defaultLanguage}
                onChange={(event) => updateAttributes({ language: event })}
            >
                {extension.options.lowlight.listLanguages().map((lang, index) => (
                    <Option key={index} value={lang}>{lang}</Option>
                ))}
            </Select>
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
};

CodeBlockComponent.displayName = 'CodeBlockComponent';

export default CodeBlockComponent;