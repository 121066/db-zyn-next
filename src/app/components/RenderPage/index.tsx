import React from "react";
import { checkFileExists } from "@/utils/file";
import Tiptap from "../TipTap";
import matter from 'gray-matter';
import { marked } from 'marked';

interface IProps {
    id: string
    article_type: string
}
function RenderPage(props: IProps) {
    const { id, article_type } = props

    let content;
    // const filePath = path.join(process.cwd(), `src/app/db/project/css/${id}/position.md`);

    try {
        // content = fs.readFileSync(filePath, 'utf8');
        content = checkFileExists(article_type, id)
    } catch (error) {
        // console.log(error)
        // 如果文件未找到，设置为 null
        content = null;
    }

    // 如果没有内容，返回默认页面
    if (!content) {
        return (
            <div>
                <h1>{id}</h1>
                <Tiptap id={id} article_type={article_type} />
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
export default RenderPage