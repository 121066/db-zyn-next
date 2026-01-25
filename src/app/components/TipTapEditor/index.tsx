'use client'
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BoldButton from '../QuickTool'
import dayjs from 'dayjs'
import { Button, message, Input } from 'antd'
import './index.scss'
const prefix = 'tip-tap-editor'
import { getRecord, addRecord, updateRecord } from '@/api/records';
import '@ant-design/v5-patch-for-react-19'; // antd5.x 兼容'
import { LifeRecord } from '@/types/records';
import { getFingerprint } from '@/utils/fingerprint';
import { useRouter } from 'next/navigation'
import onHandle from '@/utils/onHandle'
import { uploadImage } from '@/api';
import Image from '@tiptap/extension-image'
import CodeBlockComponent from '../CodeBlockComponent'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
const lowlight = createLowlight('')
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
interface Props {
    id: string
}
export default function TipTapEditor({ id }: Props) {
    const router = useRouter()
    const [lifeRecordValue, setLifeRecordValue] = useState<LifeRecord>({
        title: '',
        content: '',
        creator_name: '小楠'
    })
    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            Image,
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlockComponent)
                    },
                })
                .configure({ lowlight }),
        ],
        content: `<p>
        <h2>${dayjs().format('YYYY-MM-DD')}今日记录</h2>
         <h5>🤔今天做了什么事情</h5>
        <h5>😊今天开心的事情</h5>
         <h5>😒今天不开心的事情</h5>
        </p>`,
        onPaste: async (event) => {
            const items = event.clipboardData.items
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item && item.kind === 'file' && item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    const { data } = await uploadImage(file)
                    if (data.urlPath) {
                        editor.commands.setImage({ src: data.urlPath });
                    }
                } else {
                    if (item && item.kind === 'file' && item.type.startsWith('application/x-zip-compressed')) {
                        console.log(item, '非图片文件')
                        // 非图片文件：调用 uploadFile
                        // const { data } = await uploadFile(file);
                        // if (data?.url && data?.originalName) {
                        //     // 以链接形式插入富文本（格式：[文件名](文件URL)）
                        //     editor.commands.insertContent({
                        //         type: 'link',
                        //         attrs: {
                        //             href: data.url,
                        //             target: '_blank' // 可选：新标签页打开
                        //         },
                        //         content: data.originalName // 链接显示的文字是原文件名
                        //     });
                        // }
                    }
                }
            }
        }
    })
    const queryRecordDetail = async () => {
        const isFlag = isNaN(Number(id))
        const { data, success } = await getRecord(isFlag ? { backup_id: id } : { id })
        if (success) {
            setLifeRecordValue(data)
            editor.commands.setContent(data.content)
        } else {
            message.warning('查询失败')
        }
    }
    useEffect(() => {
        if (id && editor && id !== 'db-zyn') {
            queryRecordDetail()
        }
    }, [id, editor]);
    onHandle.on('save', () => {
        // console.log('save')
        saveRecord()
    })
    // 保存生活记录
    const saveRecord = async () => {
        // console.log('saveRecord', '点击了哦')

        const content = editor.getHTML()
        if (lifeRecordValue.id) {
            const { success } = await updateRecord({ ...lifeRecordValue, content: editor.getHTML() })
            if (success) {
                message.success('修改成功')
                router.push(`/db/record/${lifeRecordValue.id}`)
                onHandle.emit('update')
            }
        } else {
            const { success, data } = await addRecord({ ...lifeRecordValue, content: editor.getHTML(), uuid: await getFingerprint() })
            if (success) {
                message.success('保存成功')
                router.push(`/db/record`)
                onHandle.emit('update')
            }
        }

    }
    return (
        <div className={prefix}>
            <Input style={{ fontSize: '22px', fontWeight: '600', height: '45px', border: 'none', width: '50%', background: 'transparent' }} placeholder='请输入标题' value={lifeRecordValue.title} onChange={(e) => {
                setLifeRecordValue((pre) => {
                    return {
                        ...pre,
                        title: e.target.value
                    }
                })
            }} />
            <BoldButton editor={editor} isTable={false}></BoldButton>
            <EditorContent className={`${prefix}-editor`} editor={editor}></EditorContent>
            {/* 操作区域 */}
            <div className=' space-x-3'>
                <Button type='primary' onClick={saveRecord}>{lifeRecordValue.id ? '修改' : '保存'}</Button>
                <Button type='primary' onClick={() => {
                    router.push('/db/record')
                }}>返回</Button>
            </div>
        </div>
    )
}
