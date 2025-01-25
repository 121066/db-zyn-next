import React from "react";
import { Button } from "antd";
import Link from "next/link";
// import ItemList from "./Component/ItemList";


export default function NewBlog() {

    return <div>
        <Link href={'/db/newblog/newblog-zyn'}>   <Button type="primary">添加知识片段</Button></Link>

    </div>;
}
