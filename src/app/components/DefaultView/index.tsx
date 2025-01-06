
import React from "react";
// import ReactMarkdown from 'react-markdown'
// import InputCode from "../InputCode";
// import MonacoEditors from "../MonacoEditor";
interface IProps {
    content: string
}
function DefaultView(props: IProps) {
    const { content } = props

    return (
        <>
            <div className="defaultView p-4" dangerouslySetInnerHTML={{ __html: content }}></div>
            {/* <InputCode></InputCode> */}
            {/* <MonacoEditors></MonacoEditors> */}
        </>
        // <div className="defaultView"></div>
        // <ReactMarkdown>{content}</ReactMarkdown>

    )
}
export default DefaultView