import React from 'react';
import './index.css'
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { marked } from 'marked';
// import Link from 'next/link';
const prefix = 'blog'
function page() {

    return (
        <div className={`${prefix}`}>
            <div>你的博客</div>
        </div>
    );
}

export default page;

