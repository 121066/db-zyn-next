import React, { useState } from "react";
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import './index.css'
const prefix = 'collapse-panel'
const CollapsePanel = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const togglePanel = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={prefix}>
            <div onClick={togglePanel} className={`${prefix}-title`} style={{ cursor: 'pointer', padding: '10px', }}>
                <span>{title}</span>
                <span >{isOpen ? <DownOutlined /> : < RightOutlined />}</span>
            </div>
            {isOpen && (
                <div className={`${prefix}-content`} style={{ padding: '10px', border: '1px solid #ccc', marginTop: '5px' }}>
                    {children}
                </div>
            )}
        </div>
    );
}
export default CollapsePanel