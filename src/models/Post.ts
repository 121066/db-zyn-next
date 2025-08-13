// src/models/Post.ts
export interface Post {
    id?: number;
    title: string;
    content: string;
    author: string;
    created_at?: Date;
    updated_at?: Date;
}

// src/models/Category.ts
export interface Category {
    id?: number;
    name: string;
    description?: string;
    created_at?: Date;
}