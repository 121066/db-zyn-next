'use client'
import React from "react";
import TipTapEditor from "@/app/components/TipTapEditor";
interface Props {
    id: string
}
const RecordsRenderPage = ({ id }: Props) => {

    return (
        <div>
            <TipTapEditor id={id}></TipTapEditor>
        </div>
    )
}
export default RecordsRenderPage