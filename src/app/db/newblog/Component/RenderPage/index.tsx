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
    const [page, setPage] = useState({
        pageNum: 1,
        pageSize: 30,
        total: 0,
        isMore: true

    }); // 当前页数
    const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
    const getList = async (pageNum = page.pageNum) => {
        setLoading(true)
        const { data, success } = await getArticleByType({ type: id, pageNum })
        if (success && data.list) {
            setList((pre) => {
                return [...pre, ...data.list]
            })
            setPage((pre) => {
                return {
                    ...pre,
                    pageNum: data.pageNum,
                    pageSize: data.pageSize,
                    total: data.total,
                    isMore: data.pageNum * data.pageSize <= data.total
                }
            })
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
    const handleScroll = () => {
        // if (loading || !hasMore) return; // 如果正在加载或没有更多数据，返回
        const scrollY = window.scrollY; // 当前滚动位置
        const windowHeight = window.innerHeight; // 窗口高度
        const documentHeight = document.documentElement.scrollHeight; // 文档总高度

        // 检查是否滚动到页面底部
        if (scrollY + windowHeight >= documentHeight - 100) { // 100 是一个缓冲值
            setPage((prevPage) => {
                return {
                    ...prevPage,
                    pageNum: prevPage.pageNum + 1
                }
            }); // 增加页数以加载更多数据

        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); // 添加滚动事件监听
        return () => {
            window.removeEventListener('scroll', handleScroll); // 清理事件监听
        };
    }, [loading, hasMore]); // 依赖于 loading 和 hasMore
    return (
        <div className=" pb-4">
            <Spin spinning={loading} fullscreen></Spin>
            <div className="  py-4  ">
                <Link className="mb-3 mt-3" href={`/db/newblog/newblog-zyn`}><Button type="primary">去新增知识库</Button></Link>
            </div>
            {list.length > 0 && <ItemList onClick={(item) => {
                router.push(`/db/newblog/${id}/${item.id}`)
            }} list={list} />}
            <div className="my-4">
                {page.isMore && !loading && <Button type="primary" onClick={() => {
                    getList(Number(page.pageNum) + 1)
                }}>加载更多</Button>}
            </div>
        </div>
    )
}
export default RenderPage