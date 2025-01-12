import React from "react";
import { Button } from "antd";
import dayjs from "dayjs";
import { getChineseWeekDay } from "@/utils/tool";
import './index.scss'
import Link from "next/link";
const prefix = 'record-page-title'
const page = () => {
    return (
        <div className={prefix}>
            <div className={`${prefix}-title`}>
                今天是: {dayjs().format('YYYY-MM-DD')}
                &nbsp;
                {getChineseWeekDay(dayjs().locale('zh-cn').format('dddd'))}
                &nbsp;
                <span>愿你每天都有好心情，开心每一天</span>
            </div>
            <Link className={`${prefix}-btn`} href={`/db/record/db-zyn`}>
                <Button type="primary">记录生活</Button>
            </Link>

        </div>
    )
}
export default page