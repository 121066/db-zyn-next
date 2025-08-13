import { Tag } from "antd"
import React from "react"


export const configOpt = [
    { value: 'react', label: <Tag color="success">React</Tag>, text: 'React' },
    { value: 'html', label: <Tag color="blue">Html</Tag>, text: 'Html' },
    { value: 'css', label: <Tag color="red">Css</Tag>, text: 'Css' },
    { value: 'js', label: <Tag color="orange">JavaScript</Tag>, text: 'JavaScript' },
    { value: 'vue', label: <Tag color="green">Vue</Tag>, text: 'Vue' },
    // 小程序
    {value:'wxProgram',label:<Tag color="orange">小程序</Tag>,text:'小程序'},
    {value:'reactNative',label:<Tag color="success">ReactNative</Tag>,text:'ReactNative'},
    {value:'nextjs',label:<Tag color="default">NextJs</Tag>,text:'nextJs'},
    { value: 'nodejs', label: <Tag color="purple">Node</Tag>, text: 'Node' },
    { value: 'TypeScript', label: <Tag color="magenta">TypeScript</Tag>, text: 'TypeScript' },
    { value: 'Python', label: <Tag color="cyan">Python</Tag>, text: 'Python' },
    { value: 'Go', label: <Tag color="geekblue">Go</Tag>, text: 'Go' },
    // { value: 'other', label: <Tag color="lime">Java</Tag> },
    { value: 'other', label: <Tag color="lime">其他</Tag>, text: '其他' },
    { value: 'algorithm', label: <Tag color="lime">算法</Tag>, text: '算法' },
    { value: 'engineering', label: <Tag color="lime">工程化</Tag>, text: '工程化' },
    { value: 'database', label: <Tag color="lime">数据库</Tag>, text: '数据库' },
    { value: 'network', label: <Tag color="lime">网络</Tag>, text: '网络' },
    { value: 'file', label: <Tag color="lime">文件</Tag>, text: '文件' },
]