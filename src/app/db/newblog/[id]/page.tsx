import React   from 'react'
import RecordsRenderPage from '@/app/components/RecordsRenderPage';
async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <RecordsRenderPage id={id}></RecordsRenderPage>
    )
}

export default page;