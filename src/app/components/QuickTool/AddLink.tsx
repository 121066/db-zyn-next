import React, { useState } from "react";
import { Popover, Input, Button } from 'antd'
interface IProps {
    children: React.ReactNode
    onChange: (value: any) => void
}

const AddLink = (props: IProps) => {
    const { children, onChange } = props
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState({
        url: '',
        title: ''
    })
    const hide = () => {
        setInputValue({
            url: '',
            title: ''
        })
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    return (
        <Popover content={<>
            <div className=" space-y-2">
                <Input placeholder="请输入链接地址:https://" value={inputValue.url} onChange={(e) => {
                    setInputValue((pre) => {
                        return {
                            ...pre,
                            url: e.target.value
                        }
                    })
                }}></Input>
                <Input placeholder="请输入链接标题" value={inputValue.title} onChange={(e) => {
                    setInputValue((pre) => {
                        return {
                            ...pre,
                            title: e.target.value
                        }
                    })
                }}></Input>
                <Button type="primary" onClick={() => {
                    if (inputValue.url && inputValue.title) {
                        onChange(inputValue)
                        hide()
                    }
                }}>确定</Button>
            </div>
        </>}
            title="插入链接"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            {children}
        </Popover>
    )
}
export default AddLink