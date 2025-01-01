import React from 'react';
import Side from './side';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=' relative flex flex-col w-full h-full bg-zinc-300'>
            <div className='flex flex-row w-full h-full p-2' style={{ height: 'calc(100vh - 45px)' }}>
                <div style={{ width: '350px' }} className='w-280 h-full bg-white rounded-md  space-y-3 flex flex-col overflow-y-auto'>
                    <Side></Side>
                </div>
                <div style={{ height: 'calc(100vh - 60px)' }} className='flex-1 rounded-md h-full bg-white ml-2 p-2 overflow-y-auto'>{children}</div>
            </div>
        </div>
    );
}