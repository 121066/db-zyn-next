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
import { Button, message, Input, Select, Tag } from 'antd' // antd组件
import { EditOutlined, RedoOutlined, EnterOutlined } from '@ant-design/icons'
import { getFingerprint } from '@/utils/fingerprint' // 获取浏览器指纹
import { addArticle, getArticle, updateArticle } from '@/api/article' // 文章接口
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
import CodeBlockComponent from '../CodeBlockComponent'
import DefaultView from '../DefaultView' // 默认视图
import '@ant-design/v5-patch-for-react-19'; // antd5.x 兼容'
import dayjs from 'dayjs'
let fingerprint = ''
// import './index.css'
import { Article } from '@/types/article' // 文章类型
import InputCode from '../InputCode'
const prefix = 'yn-tiptap'
const lowlight = createLowlight('')
import { uploadImage } from '@/api'
interface TiptapProps {
    id: string,
    article_type: string
}
let codeParams = {
    code_content: '',
    css_content: '',
    html_content: '',
}
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
// import Highlight from '@tiptap/extension-highlight'
const Tiptap = (props: TiptapProps) => {
    const [articleValue, setArticleValue] = useState<Article>() // 文章字段
    const [loading, setLoading] = useState<boolean>(false) // 保存按钮
    const [isEdit, setIsEdit] = useState<boolean>(false) // 编辑文章
    const [historyList, setHistoryList] = useState<Array<Record<string, string>>>([]) // 历史版本数据
    const { id, article_type } = props
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
        ],
        content: '',
        onPaste: async (event) => {
            const items = event.clipboardData.items
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                // 检查是否是文件类型
                if (item && item.kind === 'file' && item.type.startsWith('image/')) {
                    const file = item.getAsFile();

                    const { data } = await uploadImage(file)
                    if (data.urlPath) {
                        editor.commands.setImage({ src: data.urlPath });
                    }
                }
            }
            event.preventDefault();
        }
    })
    // 获取浏览器指纹
    const handleFingerprint = async () => {
        const res = await getFingerprint()
        fingerprint = res || ''
        return res || ''
    }
    const handleSetData = (data) => {
        editor.commands.setContent(data.content)
        setArticleValue((pre) => {
            return {
                ...pre,
                ...data
            }
        })
        const { code_content, css_content, html_content } = data
        codeParams = { code_content, css_content, html_content }
    }
   
    const onChange = (e) => {
        console.log(e, '编辑器', editor.getHTML())
        console.log('打印')
    }

    return (
        <div className={prefix}>
          <BoldButton editor={editor}></BoldButton>
          <EditorContent
                className={`${prefix}-editor mt-3`}  onChange={onChange} editor={editor} />
         
         <InputCode codeParams={codeParams} onChange={(e, type) => {
                codeParams[type] = e
            }}></InputCode>
        </div>

    )
}

export default Tiptap
