import Link from 'next/link';
import React from 'react';


export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=' relative flex flex-col w-full h-full bg-zinc-300'>
            <div className='flex flex-row w-full h-full p-2' style={{ height: 'calc(100vh - 45px)' }}>
                <div style={{ width: '350px' }} className='w-280 h-full bg-white rounded-md  space-y-3 flex  p-3 flex-col text-left overflow-y-auto'>
                    <Link href={'/db/API/article'}>文章接口</Link>
                    <Link href={'/db/API/login'}>登录接口</Link>
                    <Link href={'/db/API/file'}>文件接口</Link>
                    <Link href={'/db/API/error_log'}>日志接口</Link>
                    <Link href={'/db/API/article_type'}>文章类型接口</Link>
                </div>
                <div style={{ height: 'calc(100vh - 60px)' }} className='flex-1 rounded-md h-full bg-white ml-2 p-2 overflow-y-auto'>{children}</div>
            </div>
        </div>
    );
}