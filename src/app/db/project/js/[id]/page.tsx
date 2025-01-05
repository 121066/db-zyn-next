import React from 'react';
const article_type = 'js'
import RenderPage from '@/app/components/RenderPage';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // 尝试读取文件内容
    return <RenderPage id={id} article_type={article_type} ></RenderPage>
}

export default page;