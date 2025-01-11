import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { Select } from 'antd';
import './index.css'
const { Option } = Select
const CodeBlockComponent = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => (

    <NodeViewWrapper className="code-block">
        <Select showSearch className='db-select' style={{ width: 150 }} defaultValue={defaultLanguage} onChange={(event) => {
            updateAttributes({ language: event })
        }
        }>
            {extension.options.lowlight.listLanguages().map((lang, index) => (
                <Option key={index} value={lang}>{lang}</Option>
            ))}
        </Select>
        <pre>
            <NodeViewContent as="code" />
        </pre>
    </NodeViewWrapper>
);

CodeBlockComponent.displayName = 'CodeBlockComponent';

export default CodeBlockComponent