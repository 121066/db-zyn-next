// src/services/postService.ts
import pool from '../mysql/index';

import { Post } from '../models/Post';

export class PostService {
    // 获取所有文章
    static async getAllPosts(): Promise<Post[]> {
        const [rows] = await pool.execute('SELECT * FROM posts ORDER BY created_at DESC');
        return rows as Post[];
    }

    // 根据ID获取文章
    static async getPostById(id: number): Promise<Post | null> {
        const [rows] = await pool.execute('SELECT * FROM posts WHERE id = ?', [id]);
        const posts = rows as Post[];
        return posts.length > 0 ? posts[0] : null;
    }

    // 创建文章
    static async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
        const [result] = await pool.execute(
            'INSERT INTO posts (title, content, author, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [post.title, post.content, post.author]
        );
        return (result as any).insertId;
    }

    // 更新文章
    static async updatePost(id: number, post: Partial<Omit<Post, 'id' | 'created_at'>>): Promise<boolean> {
        const [result] = await pool.execute(
            'UPDATE posts SET title = ?, content = ?, author = ?, updated_at = NOW() WHERE id = ?',
            [post.title, post.content, post.author, id]
        );
        return (result as any).affectedRows > 0;
    }

    // 删除文章
    static async deletePost(id: number): Promise<boolean> {
        const [result] = await pool.execute('DELETE FROM posts WHERE id = ?', [id]);
        return (result as any).affectedRows > 0;
    }
}