import React, { useEffect, useState } from "react";
import { getRecord } from "@/api/records";
import TipTapEditor from "@/app/components/TipTapEditor";
interface Props {
    id: string
}
const RenderPage = ({ id }: Props) => {

    const [list, setList] = useState([]);
    const queryRecordDetail = async () => {
        const { data, success } = await getRecord({ id })
        if (success) {
            console.log(data)
            // setList(data)
        }
    }
    useEffect(() => {
        if (id) {
            queryRecordDetail()
        }
    }, [id]);
    return (
        <div>
            <TipTapEditor></TipTapEditor>
        </div>
    )
}
export default RenderPage