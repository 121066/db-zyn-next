'use client'
import React, { useEffect, useState } from 'react'
import './index.scss'
const prefix = 'side-record'
import { getRecordList } from '@/api/records'
import { LifeRecord } from '@/types/records'
import { Tree, Button, Tooltip } from 'antd';
import type { TreeDataNode } from 'antd';
import Link from 'next/link';
import { SmileOutlined, MehOutlined, FrownFilled, FrownOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import dayjs from 'dayjs'
import onHandle from '@/utils/onHandle'
import { dbThrottle } from '@/utils/throttle'
// import { throttle } from 'lodash'
const Side = () => {
    const router = useRouter()
    const pathname = usePathname()
    // const listCurrent = useRef<LifeRecord[]>([])
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
    onHandle.on('update', dbThrottle(queryRecordList, 1000))
    const isAdd = pathname === '/db/record/db-zyn'
    return (
        <div className={prefix}>
            {!isAdd && <div>
                <Button type="primary" onClick={() => {
                    onHandle.emit('save')
                    router.push('/db/record/db-zyn')
                }}>新增记录</Button>
            </div>}
            {
                list?.map((item, index) => {
                    return (
                        <div className=' overflow-hidden overflow-clip overflow-y-auto text-ellipsis' key={index}>
                            <Tooltip title={item.title}>
                                <Button type="text" onClick={() => {
                                    router.push(`/db/record/${item?.id}`)
                                }} >{item.title} {dayjs(item.created_at).format('MM-DD HH:mm:ss')}</Button>
                            </Tooltip>
                        </div>
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