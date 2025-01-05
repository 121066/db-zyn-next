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
import { Button, message, Input } from 'antd'
import { getFingerprint } from '@/utils/fingerprint'
import { addArticle, getArticle, updateArticle } from '@/api/article'
import DefaultView from '../DefaultView'
import '@ant-design/v5-patch-for-react-19';
let fingerprint = ''
import './index.css'
import { Article } from '@/types/article'
const prefix = 'yn-tiptap'
interface TiptapProps {
    id: string,
    article_type: string
}
// import Highlight from '@tiptap/extension-highlight'
const Tiptap = (props: TiptapProps) => {
    const [articleValue, setArticleValue] = useState<Article>() // 文章字段
    const [loading, setLoading] = useState<boolean>(false) // 保存按钮
    const [isEdit, setIsEdit] = useState<boolean>(false) // 编辑文章
    const { id, article_type } = props
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
            <div className={`${prefix}-title flex flex-row justify-center items-center mt-3 mb-3`}>
                {isEdit && <>
                    <div className=' w-20'>标题</div>   <Input value={articleValue?.title} onChange={(e) => {
                        setArticleValue((pre) => {
                            return {
                                ...pre,
                                title: e.target.value
                            }
                        })
                    }} style={{ width: '400px' }}></Input>
                </>}
                {!isEdit && <div className=' font-bold   text-lg text-center'>{articleValue?.title}</div>}
                <Button type='primary' onClick={() => {
                    setIsEdit(true)
                }} className='ml-3' disabled={isEdit}>编辑文章</Button>
            </div>
            {isEdit && <BoldButton editor={editor}></BoldButton>}
            {isEdit && <EditorContent className={`${prefix}-editor mt-3`} onChange={onChange} editor={editor} />}
            {!isEdit && <DefaultView content={articleValue?.content || ''}></DefaultView>}
            <div className=' mt-3 text-center'>
                {isEdit &&
                    <Button type='primary' onClick={async () => {
                        setArticleValue((pre) => {
                            return {
                                ...pre,
                                content: editor.getHTML(),
                                uuid: fingerprint,
                                type: id
                            }
                        })
                        if (!editor.getHTML()) {
                            return message.open({ type: 'error', content: '请输入内容' })
                        }
                        setLoading(true)
                        let successFlag = false
                        let saveType = ''
                        if (articleValue?.id) {
                            const { success, data } = await updateArticle({
                                ...articleValue,
                                content: editor.getHTML(),
                                uuid: fingerprint || handleFingerprint(),
                                type: id,
                                article_type
                            })
                            saveType = 'update'
                            successFlag = success
                        } else {
                            const { success, data } = await addArticle({
                                content: editor.getHTML(),
                                uuid: fingerprint || handleFingerprint(),
                                type: id,
                                article_type
                            })
                            saveType = 'add'
                            if (success) {
                                setArticleValue((pre) => {
                                    return {
                                        ...pre,
                                        id: data.id
                                    }
                                })
                            }
                            successFlag = success

                        }
                        const titleObj = {
                            'update': '更新成功',
                            'add': '添加成功'
                        }
                        if (successFlag) {
                            setIsEdit(false)
                            message.open({ type: 'success', content: titleObj[saveType] })
                        } else {
                            message.open({ type: 'error', content: '保存失败' })
                        }
                        setLoading(false)


                    }} loading={loading}>{articleValue?.id ? '更新' : '保存'}</Button>}
            </div>
        </div>

    )
}

export default Tiptap
