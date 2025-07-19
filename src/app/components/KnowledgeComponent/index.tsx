'use client'
// 知识库组件
import React, { useState, useEffect, useRef } from "react";
import TipTapComponent from "../TipTapComponent";
import "./index.scss"
import { Input, Select, Button, Spin, message } from "antd";
import InputCode from "../InputCode";
import { useRouter } from "next/navigation";
import useArticles from "@/hooks/useArticles";
import { Article } from "@/types/article";
import { configOpt } from "@/app/db/newblog/config";
import { getFingerprint } from "@/utils/fingerprint";
import onHandle from "@/utils/onHandle";
const prefix = 'knowledge'
interface IProps {
    id?: string
}
function KnowledgeComponent({ id }: IProps) {
    const [loading, setLoading] = useState(true)
    const idRef = useRef(null)
    const router = useRouter()
    const [article, setArticle] = useState<Article>() // 文章详情
    const [codeParams, setCodeParams] = useState({ // 代码内容
        code_content: '',
        css_content: '',
        html_content: '',
    })
    const [codeContent, setCodeContent] = useState('') // 代码内容
    const { getArticleItems, updateArticleItems, addArticleItems } = useArticles()
    const getDetail = async () => {
        const data = await getArticleItems({ id })
        if (data) {
            setArticle(data)
            setLoading(false)
            const { code_content, css_content, html_content } = data
            setCodeParams({
                code_content,
                css_content,
                html_content
            })
        }
    }
    useEffect(() => {
        if (id && idRef.current !== id) {
            idRef.current = id
            getDetail()
        } else {
            setLoading(false)
        }
    }, [id])
    // 保存和更新文章
    const saveArticle = async () => {
        if (!article?.article_type || !article?.title) {
            return message.open({ type: 'warning', content: '请选择文章类型和完善标题' })
        }
        setLoading(true)
        if (id) {
            const { success } = await updateArticleItems({
                ...article,
                content: codeContent,
                ...codeParams,
                // type: article?.article_type

            })
            if (success) {
                onHandle.emit('list', '1')

                router.back()
                message.open({ type: 'success', content: '保存成功' })
            } else {
                message.open({ type: 'error', content: '保存失败' })
            }
            setLoading(false)
        } else {
            const { success } = await addArticleItems({
                ...article,
                content: codeContent,
                ...codeParams,
                uuid: await getFingerprint(),
                type: article?.article_type,
                // avatar: 'https://dbyxs.top/file/a7228d1175b415bfe21e37a83234f025',
                creator_name: '小楠',
                creator_id: 1
            })
            if (success) {
                onHandle.emit('list', '1')

                router.back()
                message.open({ type: 'success', content: '保存成功' })
            } else {
                message.open({ type: 'error', content: '保存失败' })
            }
            setLoading(false)
        }
    }
    return (
        <div className={`${prefix}`}>
            <Spin spinning={loading} fullscreen></Spin>
            <div className="flex flex-row justify-start items-center">
                <Input onChange={(e) => {
                    setArticle((pre) => {
                        return {
                            ...pre,
                            title: e.target.value
                        }
                    })
                }} value={article?.title} className={`${prefix}-title`} style={{ fontSize: '22px', marginBottom: '12px', fontWeight: '600', height: '45px', border: 'none', width: '50%', background: 'transparent', boxShadow: 'none' }} placeholder="请输入标题"></Input>
                <div className={`${prefix}-desc items-center min-w-[290px] flex flex-row text-ft-placeholder`}>类型：<Select options={configOpt} onChange={(e) => {
                    setArticle((pre) => {
                        return {
                            ...pre,
                            article_type: e
                        }
                    })
                }} value={article?.article_type} style={{ minWidth: '240px' }}></Select></div>
                <div className=" flex flex-row justify-start items-center space-x-3 ml-4">
                    <Button type='primary' onClick={saveArticle}>保存</Button>
                    <Button type='primary' onClick={() => {
                        // router.push('/db/newblog')
                        router.back()
                    }}>返回</Button>
                </div>
            </div>
            <TipTapComponent id={id} onChange={setCodeContent} content={article?.content}></TipTapComponent>
            <InputCode codeParams={codeParams} onChange={(e, type) => {
                setCodeParams((pre) => {
                    return {
                        ...pre,
                        [type]: e
                    }
                })

            }}></InputCode>
        </div>
    )
}
export default KnowledgeComponent