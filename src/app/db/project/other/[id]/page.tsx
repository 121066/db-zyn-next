import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const content = fs.readFileSync(path.join(process.cwd(), `src/app/db/project/other/${id}.md`), 'utf8');
    const matterResult = matter(content);
    const processedContent = marked(matterResult.content);
    return (
        <div dangerouslySetInnerHTML={{ __html: processedContent }}>

        </div>
    );

}

export default page;