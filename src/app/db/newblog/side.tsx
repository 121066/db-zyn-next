import React from 'react'
import {Select,Tag} from 'antd'
function Side(){
    return (
        <div style={{minWidth:'240px'}} className="p-3 flex flex-col">
            <Select   options={[{ value: 'React', label: <Tag  color="success">React</Tag> }]}></Select>
        </div>
    )
}
export default Side