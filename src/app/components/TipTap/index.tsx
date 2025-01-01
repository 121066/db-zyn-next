'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// import Highlight from '@tiptap/extension-highlight'
const Tiptap = () => {
    const editor = useEditor({
        // Use the default extensions
        extensions: [StarterKit, Document, Paragraph, Text,],

        content: '<p>Hello World! 🌎️</p>',
    })
    const onChange = (e) => {
        console.log(e, '编辑器')
    }
    return <EditorContent onChange={onChange} editor={editor} />
}

export default Tiptap
