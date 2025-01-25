'use client'
import React from 'react'
import KnowledgeComponent from '@/app/components/KnowledgeComponent';


function Page({ params }) {
    // console.log(ids)
    const { ids } = React.use(params)

    return (
        <>
            <KnowledgeComponent id={ids} ></KnowledgeComponent>
        </>
    )
}

export default Page;