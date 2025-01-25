'use client'
import React, { useState, useEffect, useRef } from "react";
import { getArticleByType } from "@/api";
import ItemList from "../ItemList";
import { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import onHandle from "@/utils/onHandle";
import { Button, Spin } from "antd";
import Link from "next/link";
interface IProps {
    id: string
}
function RenderPage(props: IProps) {
    const { id } = props
    const [list, setList] = useState<Array<Article>>([])
    const router = useRouter()
    const idRef = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const getList = async () => {
        setLoading(true)
        const { data, success } = await getArticleByType({ type: id })
        if (success && data.list) {
            setList(data.list)
        }
        setLoading(false)
    }
    useEffect(() => {
        if (id && idRef.current !== id) {
            idRef.current = id
            getList()
        }
    }, [id])
    onHandle.on('list', getList)
    return (
        <div className=" space-y-3">
            <Spin spinning={loading} fullscreen></Spin>
            <h1> {id}</h1>
            <Link className="mb-3 mt-3" href={`/db/newblog/newblog-zyn`}><Button type="primary">去新增知识库</Button></Link>
            {list.length > 0 && <ItemList onClick={(item) => {
                router.push(`/db/newblog/${id}/${item.id}`)
            }} list={list} />}

        </div>
    )
}
export default RenderPage