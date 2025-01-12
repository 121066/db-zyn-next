import React from 'react';
import Side from './side';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const handleClick = () => {
        console.log('点击')
    }
    return (
        <div className=' relative flex flex-col w-full h-full'>
            <div className=' p-2 flex flex-row h-full'>
                {/* 左侧菜单 */}
                <Side></Side>
                {/* 右侧主体内容区域 */}
                <div className=' w-full h-full p-3'>
                    {children}

                </div>
            </div>
        </div>
    );
}