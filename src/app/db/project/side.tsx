'use client'
import React from 'react';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ConfigMenu } from './config'
import { Tooltip } from 'antd';
import { usePathname } from 'next/navigation';
export default function Side() {
    const pathname = usePathname()
    const items: MenuProps['items'] = ConfigMenu.map((item) => ({
        label: item.name,
        key: item.name,
        children: item.children.map((child) => ({
            label: <Tooltip title={child.name}>
                <Link href={`${child.path}`}>{child.name}</Link>
            </Tooltip>,
            key: child.path,
        })),
    }));
    return <div className='w-full h-full bg-white p-2 space-y-3 flex flex-col overflow-y-auto'>
        <div className='w-full h-full  space-y-3 flex flex-col overflow-y-auto'>
            <Menu

                // style={{ width: 256 }}
                // defaultSelectedKeys={['/yn/db/project/css/unit']}
                // defaultOpenKeys={['/yn/db/project/css/unit']}
                selectedKeys={[pathname]}
                mode="inline"
                items={items}
            />
        </div>
    </div>
}