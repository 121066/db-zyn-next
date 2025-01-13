'use client'
import React from "react";
import TipTapEditor from "@/app/components/TipTapEditor";
interface Props {
    id: string
}
const RecordsRenderPage = ({ id }: Props) => {

    return (
        <TipTapEditor id={id}></TipTapEditor>
    )
}
export default RecordsRenderPage