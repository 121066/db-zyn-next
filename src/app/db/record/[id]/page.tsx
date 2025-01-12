import React from 'react';
// import RenderPage from './RenderPage.t
import RecordsRenderPage from '@/app/components/RecordsRenderPage';
async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div>
            <RecordsRenderPage id={id}></RecordsRenderPage>
        </div>
    )
}

export default page;