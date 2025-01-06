import React, { useEffect } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
interface IProps {
    onChange: (params: string, type: string) => void;
    codeParams: {
        code_content: string
        css_content: string
        html_content: string
    }
}
function InputCode(props: IProps) {
    const { onChange, codeParams } = props;
    const [code, setCode] = React.useState(`
        function Greeting() {
          return <h1>Hello, World!</h1>;
        }
      `)
    useEffect(() => {
        if (codeParams.code_content) {
            setCode(codeParams.code_content)
        }
    }, [codeParams])
    const handleCodeChange = (newCode) => {
        onChange(newCode, 'code_content')
        setCode(newCode);
        // 在这里可以对新的代码进行处理，比如发送到服务器等
        // console.log('实时获取到的代码:', newCode);
    };
    // console.log(code)
    return (
        <div className=" flex flex-col justify-between ">
            <div>
                <LiveProvider code={code} scope={{}} >
                    <LiveEditor onChange={handleCodeChange} />
                    <LiveError />
                    <LivePreview />
                </LiveProvider>
            </div>
            <div>
                {/* <LiveProvider code={code} scope={{}} >
                    <LiveEditor onChange={handleCodeChange} />
                    <LiveError />
                    <LivePreview />
                </LiveProvider> */}
            </div>
        </div>
    );
}
export default InputCode