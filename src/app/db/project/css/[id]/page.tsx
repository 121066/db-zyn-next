import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Tiptap from '@/app/components/TipTap';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 尝试读取文件内容
    let content;
    try {
        content = fs.readFileSync(path.join(process.cwd(), `src/app/db/project/css/${id}.md`), 'utf8');
    } catch (error) {
        console.log(error)
        // 如果文件未找到，设置为 null
        content = null;
    }

    // 如果没有内容，返回默认页面
    if (!content) {
        return (
            <div>
                <h1>内容未找到</h1>
                <Tiptap />
            </div>
        );
    }

    // 处理 Markdown 内容
    const matterResult = matter(content);
    const processedContent = marked(matterResult.content);

    return (
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    );
}

export default page;