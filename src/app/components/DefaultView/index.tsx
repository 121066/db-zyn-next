
import React, { useEffect } from "react";
// import ReactMarkdown from 'react-markdown'
interface IProps {
    content: string
}
function DefaultView(props: IProps) {
    const { content } = props

    return (
        // <div className="defaultView"></div>
        // <ReactMarkdown>{content}</ReactMarkdown>
        <div className="defaultView p-4" dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}
export default DefaultView