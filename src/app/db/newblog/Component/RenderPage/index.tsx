'use client'
import React, { useState, useEffect, useRef } from "react";
import { getArticleByType } from "@/api";
import ItemList from "../ItemList";
import { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import onHandle from "@/utils/onHandle";
import { Button, Spin, Select } from "antd";
import Link from "next/link";
import { dbThrottle, dbdebounce } from "@/utils/throttle";
interface IProps {
    id: string
}
interface PageParams {
    pageNum: number,
    pageSize: number,
    total: number,
    isMore: boolean
}
function RenderPage(props: IProps) {
    const { id } = props
    const [list, setList] = useState<Array<Article>>([])
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const router = useRouter()
    const idRef = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [value, setValue] = useState<string>();
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState<PageParams>({
        pageNum: 1,
        pageSize: 30,
        total: 0,
        isMore: true

    }); // 当前页数
    const refMore = useRef(true)
    const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
    const getList = async (pageNum = page.pageNum) => {
        if (!refMore.current) return
        // if (!(page.pageNum * page.pageSize <= page.total)) return
        // setLoading(true)
        const { data, success } = await getArticleByType({ type: id, pageNum })
        // setLoading(false)
        if (success && data.list) {
            // console.log('///')
            setPage((pre) => {
                return {
                    // ...pre,
                    pageNum: Number(data.pageNum),
                    pageSize: Number(data.pageSize),
                    total: data.total,
                    isMore: data.pageNum * data.pageSize <= data.total
                }
            })
            refMore.current = data.pageNum * data.pageSize <= data.total
            setList((pre) => {
                return [...pre, ...data.list]
            })

        }

    }
    useEffect(() => {
        if (id && idRef.current !== id) {
            idRef.current = id

            getList()
        }
    }, [id])
    onHandle.on('list', getList)
    const handleScroll = dbThrottle(() => {
        if (scrollRef.current) {
            const scrollTop = scrollRef.current.scrollTop; // 当前滚动位置
            const windowHeight = scrollRef.current.clientHeight; // 元素的可视高度
            const scrollHeight = scrollRef.current.scrollHeight; // 元素的总高度

            // 检查是否滚动到达底部
            if (scrollHeight - scrollTop - windowHeight <= 100 && page.isMore) {
                if (!(page.pageSize * page.pageNum <= page.total)) {
                    getList(Number(page.pageNum) + 1)
                }
                // 在这里调用加载更多数据的函数
            }
        }
        // console.log('执行了吗')
    }, 500)

    useEffect(() => {
        const element = scrollRef.current
        if (element) {
            element.addEventListener('scroll', handleScroll)
        }
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll)
            }
        }
    }, [loading, hasMore]); // 依赖于 loading 和 hasMore
    // console.log(scrollRef.current?.scrollTop, '滚动距离')
    const fetch = dbdebounce(async (value: string, setData: any) => {
        const { data, success } = await getArticleByType({ type: id, title: value })
        if (success) {
            setData(() => {
                return data?.list?.map((item: any) => {
                    return {
                        value: item.id,
                        text: item.title
                    }
                })
            })
        }
    }, 200);
    const handleSearch = (newValue: string) => {
        fetch(newValue, setData);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
        // console.log(newValue);
        router.push(`/db/newblog/${id}/${newValue}`)
    };
    return (
        <div ref={scrollRef} className=" overflow-y-auto h-full pt-4 pb-4 ">
            <Spin spinning={loading} fullscreen></Spin>
            <div className="pb-4 space-x-3 bg-white flex flex-row justify-start sticky top-0 z-50  items-start">
                <Select
                    showSearch
                    value={value}
                    placeholder={'搜索知识库'}
                    style={{ width: '280px' }}
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange}
                    notFoundContent={null}
                    options={(data || []).map((d) => ({
                        value: d.value,
                        label: d.text,
                    }))}></Select>
                <Link className="mb-3 " href={`/db/newblog/newblog-zyn`}><Button type="primary">去新增知识库</Button></Link>
            </div>
            {<ItemList onClick={(item) => {
                router.push(`/db/newblog/${id}/${item.id}`)
            }} list={list} />}
            {/* {
                list.length <= 0 && <ItemList list={list}></ItemList>
            } */}
            <div className="my-4">
                {page.isMore && !loading && <Button type="primary" onClick={() => {
                    getList(Number(page.pageNum) + 1)
                }}>加载更多</Button>}
                {!page.isMore && <div className=" text-center">没有更多了</div>}
            </div>
        </div>
    )
}
export default RenderPage