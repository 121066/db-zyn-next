import React, { useState } from "react";
import { editor as MonacoEditor } from 'monaco-editor';
// import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
function MonacoEditors() {
    const options = {
        selectOnLineNumbers: true,
    };
    const [code, setCode] = useState('')
    const editor = MonacoEditor.create('#editor', {
        /* 一些配置， 比如说主题，语言类型，等等 */
        theme: 'vs',
        /* 语言 */
        language: 'sql',
        /* 是否只读 */
        readOnly: false,
        /* 初始值 */
        value: '',
        /* 自动布局 */
        automaticLayout: true,
        /* 阻止编辑器滚动到最后一行之外 */
        scrollBeyondLastLine: true,
    });
    return (
        <div>
            <div id="editor"></div>
        </div>
    )
}
export default MonacoEditors