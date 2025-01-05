import fs from 'fs';
import path from 'path';
export const checkFileExists = (url, id) => {
    // 构建文件路径
    const dirPath = path.join(process.cwd(), `src/app/db/project/${url}/${id}`);
    const filePath = path.join(dirPath, 'position.md');

    // 检查目录是否存在
    if (fs.existsSync(dirPath)) {
        // 读取目录中的文件
        const files = fs.readdirSync(dirPath);

        // 检查特定文件是否存在
        if (files.includes('position.md')) {
            console.log('文件存在:', filePath);
            // 读取文件内容
            const content = fs.readFileSync(filePath, 'utf8');
            return content; // 返回文件内容
        } else {
            // console.error('文件不存在:', filePath);
            return null; // 或返回默认内容
        }
    } else {
        // console.error('目录不存在:', dirPath);
        return null; // 或返回默认内容
    }
};
export const getWriteFile = (url, id) => {
    // 构建文件路径
    const dirPath = path.join(process.cwd(), `src/app/db/${url}/${id}`);
    console.log(dirPath, '文件路径')
    const filePath = path.join(dirPath, 'position.md');

    // 检查目录是否存在
    if (fs.existsSync(dirPath)) {
        // 读取目录中的文件
        const files = fs.readdirSync(dirPath);

        // 检查特定文件是否存在
        const content = fs.readFileSync(filePath, 'utf8');
        return content; // 返回文件内容
    } else {
        // console.error('目录不存在:', dirPath);
        return null; // 或返回默认内容
    }
}