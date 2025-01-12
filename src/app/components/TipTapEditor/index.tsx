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
interface Props {
    id: string
}
export default function TipTapEditor({ id }: Props) {
    const router = useRouter()
    const [lifeRecordValue, setLifeRecordValue] = useState<LifeRecord>({
        title: '未命名标题',
        content: ''
    })
    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
        ],
        content: `<p>
        <h2>${dayjs().format('YYYY-MM-DD')}今日记录</h2>
         <h5>今天做了什么事情</h5>
        <h5>今天开心的事情</h5>
         <h5>今天不开心的事情</h5>
        </p>`,
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
    // 保存生活记录
    const saveRecord = async () => {
        const content = editor.getHTML()
        if (lifeRecordValue.id) {
            const { success } = await updateRecord({ ...lifeRecordValue, content: editor.getHTML() })
            if (success) {
                message.success('修改成功')
                router.push(`/db/record/${lifeRecordValue.id}`)
            }
        } else {
            const { success, data } = await addRecord({ ...lifeRecordValue, content: editor.getHTML(), uuid: await getFingerprint() })
            if (success) {
                message.success('保存成功')
                router.push(`/db/record`)
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
            <div>
                <Button type='primary' onClick={saveRecord}>{lifeRecordValue.id ? '修改' : '保存'}</Button>
            </div>
        </div>
    )
}
