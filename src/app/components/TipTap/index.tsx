'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BoldButton from '../QuickTool'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Button } from 'antd'
// import Highlight from '@tiptap/extension-highlight'
const Tiptap = () => {
    const editor = useEditor({
        // Use the default extensions
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Text,
            Document,
            Paragraph
        ],
        content: '',
    })
    const onChange = (e) => {
        console.log(e, '编辑器', editor.getHTML())
        console.log('打印')
    }
    return (
        <>
            <BoldButton editor={editor}></BoldButton>
            <EditorContent onChange={onChange} editor={editor} />
            <Button type='primary' onClick={() => {
                console.log(editor.getHTML())
            }}>获取</Button>
        </>

    )
}

export default Tiptap
