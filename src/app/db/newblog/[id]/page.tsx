// 'use client'
import React from 'react'
// import KnowledgeComponent from '@/app/components/KnowledgeComponent';
import RenderPage from '../Component/RenderPage';
import KnowledgeComponent from '@/app/components/KnowledgeComponent';
async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (id !== 'newblog-zyn') {
        return <RenderPage id={id} ></RenderPage>
    } else {
        return <KnowledgeComponent></KnowledgeComponent>
    }

}

export default Page;