'use client'
import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BoldButton from '../QuickTool'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Button } from 'antd'
import { getFingerprint } from '@/utils/fingerprint'
import { addArticle, getArticle } from '@/api/article'
let fingerprint = ''
import './index.css'
import { Article } from '@/types/article'
const prefix = 'yn-tiptap'
interface TiptapProps {
    id: string
}
// import Highlight from '@tiptap/extension-highlight'
const Tiptap = (props: TiptapProps) => {
    const [articleValue, setArticleValue] = useState<Article>()
    const { id } = props
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
    // 获取浏览器指纹
    const handleFingerprint = async () => {
        const res = await getFingerprint()
        fingerprint = res
        return res
    }
    // 获取单篇文章
    const getArticleItems = async () => {
        const { data, success } = await getArticle({
            id,
            // uuid: await handleFingerprint(),
            // type: id
        })
        if (success) {
            editor.commands.setContent(data.content)
            setArticleValue(data)
        }
        console.log(data, success)
    }
    useEffect(() => {
        handleFingerprint()
        if (id && editor) {
            getArticleItems()
        }
    }, [id, editor])

    const onChange = (e) => {
        console.log(e, '编辑器', editor.getHTML())
        console.log('打印')
    }
    return (
        <div className={prefix}>
            <BoldButton editor={editor}></BoldButton>
            <EditorContent className={`${prefix}-editor`} onChange={onChange} editor={editor} />
            <Button type='primary' onClick={async () => {
                setArticleValue((pre) => {
                    return {
                        ...pre,
                        content: editor.getHTML(),
                        uuid: fingerprint,
                        type: id
                    }
                })

                const response = await addArticle({
                    content: editor.getHTML(),
                    uuid: fingerprint || handleFingerprint(),
                    type: id
                })
                const result = await response.json()
                console.log(result)
                console.log({
                    content: editor.getHTML(),
                    uuid: fingerprint,
                    type: id
                })
            }}>获取</Button>
        </div>

    )
}

export default Tiptap
