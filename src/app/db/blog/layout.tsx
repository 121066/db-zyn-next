'use client'
import React from 'react';
import Link from 'next/link';
import CollapsePanel from '@/app/components/CollapsePanel';
import { sidebar } from './config';
import { usePathname } from 'next/navigation';
export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <div className=' relative flex flex-col w-full h-full bg-slate-200'>
            <div className='flex flex-row w-full h-full p-3'>
                <div style={{ width: '280px' }} className='w-280 h-full bg-white p-2 space-y-3 flex flex-col overflow-y-auto'>
                    {sidebar.map((item, index) => (
                        <CollapsePanel key={index} title={item.title}>
                            <div>
                                {item.children.map((child, childIndex) => (
                                    <div className=' space-y-3' key={childIndex}>
                                        <Link className={`${pathname === child[0] ? 'active' : ''}`} href={`/db/blog/${child[0]}`}>{child[1]}</Link>
                                    </div>
                                ))}
                            </div>
                        </CollapsePanel>
                    ))}
                </div>
                <div style={{ height: 'calc(100vh - 75px)' }} className='flex-1 h-full bg-white ml-3 p-3 overflow-y-auto'>{children}</div>
            </div>

        </div>
    );
}
// export async function getStaticProps() {

//     return {
//         props: {
//             postsData: '天机'
//         }
//     };
// }