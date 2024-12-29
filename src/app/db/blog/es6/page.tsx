// 'use client'
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';


async function Es6Page({ searchParams }: { searchParams: Promise<{ id: string; paths: string }> }) {

    const { id, paths } = await searchParams
    const content = fs.readFileSync(path.join(process.cwd(), `src/app/db/blog/${paths}/${id}.md`), 'utf8');
    const matterResult = matter(content);
    const processedContent = marked(matterResult.content);
    return (
        <div dangerouslySetInnerHTML={{ __html: processedContent }}>

        </div>
    );
}

export default Es6Page;
