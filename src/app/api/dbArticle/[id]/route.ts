// src/app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { PostService } from '../../../../services/postService';

// GET /yn/api/dbArticle/1 - 获取单篇文章
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
        }

        const post = await PostService.getPostById(id);
        if (!post) {
            return NextResponse.json({ error: '文章未找到' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('获取文章失败:', error);
        return NextResponse.json({ error: '获取文章失败' }, { status: 500 });
    }
}

// PUT /api/posts/:id - 更新文章
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
        }

        const data = await request.json();
        const success = await PostService.updatePost(id, data);

        if (!success) {
            return NextResponse.json({ error: '文章未找到或更新失败' }, { status: 404 });
        }

        return NextResponse.json({ message: '文章更新成功' });
    } catch (error) {
        console.error('更新文章失败:', error);
        return NextResponse.json({ error: '更新文章失败' }, { status: 500 });
    }
}

// DELETE /api/posts/:id - 删除文章
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
        }

        const success = await PostService.deletePost(id);
        if (!success) {
            return NextResponse.json({ error: '文章未找到' }, { status: 404 });
        }

        return NextResponse.json({ message: '文章删除成功' });
    } catch (error) {
        console.error('删除文章失败:', error);
        return NextResponse.json({ error: '删除文章失败' }, { status: 500 });
    }
}
// src/app/api/dbArticle/[id]/route.ts
// ... 其他导入和方法

// POST /api/dbArticle/:id - 为特定ID创建文章（不常见用法）
export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: '无效的文章ID' }, { status: 400 });
        }

        // 从请求体中获取数据
        const body = await request.json();
        const { title, content, author } = body;

        if (!title || !content || !author) {
            return NextResponse.json(
                { error: '标题、内容和作者是必填项' },
                { status: 400 }
            );
        }

        // 检查文章是否已存在
        const existingPost = await PostService.getPostById(id);
        if (existingPost) {
            return NextResponse.json(
                { error: 'ID对应的文章已存在' },
                { status: 409 }
            );
        }

        // 注意：这里你需要修改 PostService.createPost 方法来接受指定ID
        // 或者使用 update 方法来创建指定ID的文章
        const success = await PostService.updatePost(id, { title, content, author });

        if (!success) {
            return NextResponse.json(
                { error: '文章创建失败' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                id,
                message: '文章创建成功',
                data: { id, title, content, author }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('创建文章失败:', error);
        return NextResponse.json({ error: '创建文章失败' }, { status: 500 });
    }
}