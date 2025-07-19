'use client'
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import dayjs from "dayjs";
import { getChineseWeekDay } from "@/utils/tool";
import './index.scss'
import Link from "next/link";
const prefix = 'record-page-title'
// const day = dayjs().format('YYYY-MM-DD')
// const week = getChineseWeekDay(dayjs().locale('zh-cn').format('dddd'))
const Page = () => {
    const [paramsTime, setParamsTime] = useState({
        day: '',
        week: ''
    })
    useEffect(() => {
        setParamsTime({
            day: dayjs().format('YYYY-MM-DD'),
            week: getChineseWeekDay(dayjs().locale('zh-cn').format('dddd'))
        })
    }, [])
    return (
        <div className={prefix}>
            <div className={`${prefix}-title`}>
                今天是: {paramsTime.day}
                &nbsp;
                {paramsTime.week}
                &nbsp;
                <span>愿你每天都有好心情，开心每一天</span>
            </div>
            <Link className={`${prefix}-btn`} href={`/db/record/db-zyn`}>
                <Button type="primary">记录生活</Button>
            </Link>

        </div>
    )
}

// export async function getServerSideProps() {
//     return {
//         props: {
//             day: dayjs().format("YYYY-MM-DD"),
//             week: getChineseWeekDay(dayjs().locale("zh-cn").format("dddd")),
//         },
//         unstable_revalidate: 0,
//     };
// }
export default Page