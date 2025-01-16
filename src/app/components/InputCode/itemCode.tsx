import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { configLanguage } from "./config";
import { Select } from 'antd'
interface IProps {
    onChange?: (val: string) => void
    language?: string
    code?: string
    scope?: object
}
function ItemCode(props: IProps) {
    const { code = '', onChange, language = 'react', scope = {} } = props
    const [languageCode, setLanguageCode] = useState(language)
    const [codeUpdate, setCodeUpdate] = useState(code)
    return (
        <div className=" relative">
            <div className=" absolute right-1 top-1">
                <Select defaultValue={languageCode} onChange={(e) => {
                    setLanguageCode(e)
                }} style={{ width: '240px', }} options={configLanguage}></Select>
            </div>
            <LiveProvider language={languageCode} code={codeUpdate} scope={scope} >

                <LiveEditor onChange={(e) => {
                    setCodeUpdate(e)
                    if (onChange) {
                        onChange(e)
                    }

                }} />
                <LiveError />
                <LivePreview />
            </LiveProvider>
        </div>
    )
}
export default ItemCode