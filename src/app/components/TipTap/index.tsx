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
import { Button, message, Input, Select } from 'antd' // antd组件
import { EditOutlined, RedoOutlined, EnterOutlined } from '@ant-design/icons'
import { getFingerprint } from '@/utils/fingerprint' // 获取浏览器指纹
import { addArticle, getArticle, updateArticle } from '@/api/article' // 文章接口
import Table from '@tiptap/extension-table'// 表格
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import DefaultView from '../DefaultView' // 默认视图
import '@ant-design/v5-patch-for-react-19'; // antd5.x 兼容
import dayjs from 'dayjs'
let fingerprint = ''
import './index.css'
import { Article } from '@/types/article' // 文章类型
import InputCode from '../InputCode'
const prefix = 'yn-tiptap'
interface TiptapProps {
    id: string,
    article_type: string
}
let codeParams = {
    code_content: '',
    css_content: '',
    html_content: '',
}
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
                // extend the existing attributes …
                ...this.parent?.(),

                // and add a new one …
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
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            CustomTableCell,
        ],
        content: '',
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
    // 获取单篇文章
    const getArticleItems = async () => {
        const { data, success } = await getArticle({
            id,
            // uuid: await handleFingerprint(),
            // type: id
        })
        if (success) {
            handleSetData(data)
            setHistoryList(() => {
                return data?.update_history.map((item, index) => {
                    return {
                        key: index,
                        title: item.title,
                        content: item.content,
                        updated_at: dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss'),
                        label: (<span>{dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss')}</span>),
                        value: item.id || index
                    }
                })
            })
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
            <div className={`${prefix}-title flex flex-row justify-start items-center mt-3 mb-3`}>
                {isEdit && <>
                    <div className='  w-20'>标题</div>   <Input value={articleValue?.title} onChange={(e) => {
                        setArticleValue((pre) => {
                            return {
                                ...pre,
                                title: e.target.value
                            }
                        })
                    }} style={{ width: '400px' }}></Input>
                </>}
                {!isEdit && <div className='ml-6 font-bold   text-lg text-center'>{articleValue?.title}</div>}
                <Button type='primary' onClick={() => {
                    setIsEdit(true)
                }} className='ml-3' icon={<EditOutlined></EditOutlined>} disabled={isEdit}>编辑文章</Button>
                <div className=' space-x-5'>
                    {articleValue?.created_at && <span className=' ml-3  text-ft-secondary text-bs'>创建时间：{articleValue?.created_at && dayjs(articleValue?.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>}
                    {historyList.length > 0 && <Select placeholder="历史版本" onChange={(e, item) => {
                        handleSetData(item)
                    }} style={{ width: '200px' }} options={historyList} >

                    </Select>}
                </div>
            </div>
            {isEdit && <BoldButton editor={editor}></BoldButton>}
            {isEdit && <EditorContent className={`${prefix}-editor mt-3`} onChange={onChange} editor={editor} />}
            {!isEdit && <DefaultView content={articleValue?.content || ''}></DefaultView>}
            <div className=' mt-3  mb-3 text-center'>

                {isEdit &&
                    <div>
                        <Button type='default' className='mr-3' onClick={async () => {
                            setIsEdit(false)
                        }} >取消</Button>
                        <Button type='primary' onClick={async () => {
                            const uuid = Object.keys(fingerprint).length ? fingerprint : ''
                            setArticleValue((pre) => {
                                return {
                                    ...pre,
                                    content: editor.getHTML(),
                                    // uuid: uuid,
                                    type: id,
                                    ...codeParams
                                }
                            })
                            if (!editor.getHTML()) {
                                return message.open({ type: 'error', content: '请输入内容' })
                            }
                            setLoading(true)
                            let successFlag = false
                            let saveType = ''
                            // 更新文章
                            if (articleValue?.id) {
                                const { success, data } = await updateArticle({
                                    ...articleValue,
                                    content: editor.getHTML(),
                                    // uuid: handleFingerprint(),
                                    type: id,
                                    article_type,
                                    ...codeParams
                                })
                                saveType = 'update'
                                successFlag = success
                            } else {
                                // 新增文章
                                const { success, data } = await addArticle({
                                    content: editor.getHTML(),
                                    uuid: fingerprint || handleFingerprint(),
                                    type: id,
                                    article_type,
                                    ...codeParams
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


                        }} icon={articleValue?.id ? <RedoOutlined /> : <EnterOutlined />} loading={loading}>{articleValue?.id ? '更新' : '保存'}</Button>
                    </div>
                }
            </div>
            {isEdit && <InputCode codeParams={codeParams} onChange={(e, type) => {
                codeParams[type] = e
            }}></InputCode>}
        </div>

    )
}

export default Tiptap
