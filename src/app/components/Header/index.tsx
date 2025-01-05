import React from 'react';
import Link from 'next/link';
import './index.css';
const prefix = 'header-top';

function Header() {

    return (
        <div className={prefix}>
            <div>小楠博客</div>
            <div className=' space-x-10 text-white'>
                <Link className=' text-white' href="/db/blog">博客</Link>
                <Link className=' text-white' href="/db/record">日常记录</Link>
                <Link className=' text-white' href="/db/newblog">新博客</Link>
                <Link className=' text-white' href="/db/API">Api</Link>
                <Link className=' text-white' href="/db/project">前端常见问答题目</Link>
            </div>
        </div>
    );
}

export default Header;