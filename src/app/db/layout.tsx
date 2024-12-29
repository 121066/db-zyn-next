import React from 'react';
import Header from '../components/Header';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=' relative flex flex-col w-full h-full'>
            <Header></Header>
            <div className='mt-12 w-full h-full'> {children}</div>
        </div>
    );
}