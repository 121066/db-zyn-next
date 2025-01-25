'use client'
import React, { useState } from 'react'
import { Select } from 'antd'
import { configOpt } from './config'
import onHandle from '@/utils/onHandle'
import { useRouter } from 'next/navigation'
function Side() {
    const [type, setType] = useState('')
    const router = useRouter()
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
                            <div onClick={() => {
                                router.push(`/db/newblog/${item.value}`)
                                // onHandle.emit('type', item.value)
                            }}>{item.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Side