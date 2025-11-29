'use client'
import React from "react";
import { Avatar, List, Space, Skeleton } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import { Article } from "@/types/article";
import Image from "next/image";
interface IProps {
    list: Array<Article>
    onClick?: (item: Article) => void
}
const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
function stripHtml(html: string) {
    // 匹配 img 标签
    const imgMatch = html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i)
    if (imgMatch) {
        // 提取图片地址并渲染图片
        return <img src={imgMatch[1]} alt="content-img" style={{ maxWidth: '100%', maxHeight: 60 }} />
    }
    // 否则只显示纯文本
    if (typeof window !== 'undefined') {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }
    return html;
}
function ItemList(props: IProps) {

    const { list, onClick } = props
    return (
        <>
            {list.length > 0 && <List
                split
                itemLayout="vertical"
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        onClick={() => {
                            if (onClick) {
                                onClick(item)
                            }
                        }}
                        className=" hover:bg-base rounded cursor-pointer"
                        style={{ padding: '12px' }}
                        actions={[
                            <IconText icon={StarOutlined} text={item.likes_count + ''} key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="0" key={'list-vertical-like-o'}></IconText>,
                            <IconText icon={EyeOutlined} text={item.views_count + ''} key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text={item.comments_count + ''} key="list-vertical-message" />,
                        ]}
                        extra={
                            <Image
                                width={100}
                                height={78}
                                alt="logo"
                                src={item?.cover_photo || 'https://dbyxs.top/file/4cc8d7e3e3b4e898f5daa4bc574878b3'}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={item.avatar ? (<Avatar src={item.avatar} />) : (<Avatar src={'https://dbyxs.top/file/4cc8d7e3e3b4e898f5daa4bc574878b3'} />)}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={<p className=" overflow-hidden text-ellipsis line-clamp-3">
                                {stripHtml(item.content)}</p>}
                        />

                    </List.Item>
                )}
            />}
            {list.length <= 0 && <>
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    return <Skeleton avatar paragraph={{ rows: 3 }} active key={index} />
                })}
            </>}
        </>
    )
}
export default ItemList