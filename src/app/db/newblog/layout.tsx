import React from 'react';
import Side from './side';
const prefix = 'db-newblog'
import './index.scss'
export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const handleClick = () => {
        console.log('点击')
    }
    return (
        <div className={`${prefix} relative flex flex-col w-full h-full`}>
            <div className=' p-2 flex flex-row h-full overflow-y-auto'>
                {/* 左侧菜单 */}
                <Side></Side>
                {/* 右侧主体内容区域 */}
                <div style={{ height: 'calc(100vh - 65px)' }} className=' bg-white rounded w-full h-full p-3 overflow-y-auto'>
                    {children}

                </div>
            </div>
        </div>
    );
}