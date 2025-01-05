import React from 'react';
import { getWriteFile } from '@/utils/file';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import fs from 'fs'

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let content
    try {
        content = fs.readFileSync(path.join(process.cwd(), `src/app/db/API/${id}.md`), 'utf8');
    } catch (error) {

    }
    if (!content) {
        return <div>404 {id}</div>
    }
    const matterResult = matter(content);
    const processedContent = marked(matterResult.content);
    return (
        <div className='p-3' dangerouslySetInnerHTML={{ __html: processedContent }}>

        </div>
    );

}

export default page;