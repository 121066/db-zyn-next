'use client'
import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
export default function NotFound() {
    const router = useRouter();
    const goBack = () => {
        window.history.back();
    }
    const goHome = () => {
        // 跳转到指定首页路径
        router.push('/db/blog');
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>404</h1>
            <p>Not Found</p>
            <div>测试404页面</div>
            <Button type='primary' className='mb-2' onClick={goHome}>返回首页</Button>
            <Button type='primary' onClick={goBack}>返回上一页</Button>
        </div>
    );
}