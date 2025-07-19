'use client'
import { useEffect, useState } from 'react'
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BoldButton from '../QuickTool'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'// 表格
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockComponent from '../CodeBlockComponent'
import '@ant-design/v5-patch-for-react-19'; // antd5.x 兼容'
import './index.scss'
import { Article } from '@/types/article' // 文章类型
// import Tesseract from 'tesseract.js'
// import { createWorker } from 'tesseract.js';

import InputCode from '../InputCode'
const prefix = 'yn-tiptap'
const lowlight = createLowlight('')
import { uploadImage } from '@/api'
interface TiptapProps {
    id: string,
    onChange?: (e: string) => void
    content?: string
    // article_type: string
}
const codeParams = {
    code_content: '',
    css_content: '',
    html_content: '',
}
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

// import Highlight from '@tiptap/extension-highlight'
const TipTapComponent = (props: TiptapProps) => {
    const [articleValue, setArticleValue] = useState<Article>() // 文章字段
    const [loading, setLoading] = useState<boolean>(false) // 保存按钮
    const [isEdit, setIsEdit] = useState<boolean>(false) // 编辑文章
    const [historyList, setHistoryList] = useState<Array<Record<string, string>>>([]) // 历史版本数据
    const { id, onChange, content } = props
    // const recognizeText = async (imageSrc) => {
    //     if (!imageSrc) return
    //     try {
    //         const reuslt = await Tesseract.recognize(imageSrc, 'eng+chi_sim', { logger: m => console.log(m) })
    //         return reuslt
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    const CustomTableCell = TableCell.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                backgroundColor: {
                    default: null,
                    parseHTML: element => element.getAttribute('data-background-color'),
                    renderHTML: attributes => {
                        return {
                            'data-background-color': attributes.backgroundColor,
                            style: `background-color: ${attributes.backgroundColor}`,
                        }
                    },
                },
            }
        },
    })
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
            Paragraph,
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            CustomTableCell,
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlockComponent)
                    },
                })
                .configure({ lowlight }),
            Link.configure({
                // openOnClick: false,
                // autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https', 'mailto', 'tel', 'ftp'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },

            }),
        ],
        content: content,
        onPaste: async (event) => {
            const items = event.clipboardData.items
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                // 检查是否是文件类型
                if (item && item.kind === 'file' && item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    // console.log(file)
                    // console.log(await recognizeText(file))
                    const { data } = await uploadImage(file)
                    if (data.urlPath) {
                        editor.commands.setImage({ src: data.urlPath });
                    }
                }
            }
            event.preventDefault();
        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML())
            }

        },

    })

    useEffect(() => {
        if (content && content) {
            editor?.commands.setContent(content)
        }
    }, [content, editor])
    return (
        <div className={prefix}>
            <BoldButton editor={editor}></BoldButton>
            <EditorContent
                className={`${prefix}-editor mt-3`} editor={editor} />

            {/* <InputCode codeParams={codeParams} onChange={(e, type) => {
                codeParams[type] = e
            }}></InputCode> */}
        </div>

    )
}

export default TipTapComponent
