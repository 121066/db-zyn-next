'use client'
import React, { useEffect, useState } from 'react'
import './index.scss'
const prefix = 'side-record'
import { getRecordList } from '@/api/records'
import { LifeRecord } from '@/types/records'
import { Tree, Button } from 'antd';
import type { TreeDataNode } from 'antd';
import Link from 'next/link';
import { SmileOutlined, MehOutlined, FrownFilled, FrownOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
const Side = () => {
    const router = useRouter()
    const [list, setList] = useState<LifeRecord[]>([])
    const treeData: TreeDataNode[] = [
        {
            title: '2025年1月',
            key: '0-0',
            icon: <SmileOutlined />,
            children: [
                {
                    title: 'leaf',
                    key: '0-0-0',
                    icon: <MehOutlined />,
                },
                {
                    title: <Link href={`/db/record/db-zyn`}>leaf</Link>,
                    key: '0-0-1',
                    icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
                },
            ],
        },
    ];
    const queryRecordList = async () => {
        const { data, success } = await getRecordList({ pageSize: 50, pageNum: 1 })
        if (success) {
            setList(data?.list || [])
        }

    }
    useEffect(() => {
        queryRecordList()
    }, [])

    return (
        <div className={prefix}>
            {
                list?.map((item, index) => {
                    return (
                        <Button key={index} type="text" onClick={() => {
                            router.push(`/db/record/${item?.id}`)
                        }} >{item.title} {dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</Button>
                    )
                })
            }
            {/* <Tree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['0-0-0']}
                switcherIcon={<DownOutlined />}
                treeData={treeData}
                style={{ backgroundColor: '#fff' }}
                onSelect={(selectedKeys, info) => {
                    router.push(`/db/record/${selectedKeys[0]}`)
                   
                }}
            /> */}
        </div>
    )
}
export default Side