'use client'
import React from 'react'
import { Select } from 'antd'
import { configOpt } from './config'
import onHandle from '@/utils/onHandle'
import { useRouter, usePathname } from 'next/navigation'

function Side() {
    // const [type, setType] = useState('')
    const router = useRouter()
    const pathname = usePathname()
    const path = pathname?.split('/')[3]
    return (
        <div style={{ minWidth: '240px' }} className="bg-white mr-2 rounded p-3 flex flex-col">
            <Select options={configOpt} onChange={(e) => {
                onHandle.emit('type', e)
                // console.log(e)
            }}></Select>
            <div className='flex flex-col space-y-3 overflow-hidden overflow-y-auto'>
                {configOpt.map((item, index) => {
                    return (
                        <div key={index} >
                            <div className={`${item.value === path ? 'active-item' : ''} hover:bg-base-light p-1 cursor-pointer rounded text-ft-primary line-clamp-1`} onClick={() => {
                                router.push(`/db/newblog/${item.value}`)
                                // setType(item.value)
                                // onHandle.emit('type', item.value)
                            }}>{item.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Side