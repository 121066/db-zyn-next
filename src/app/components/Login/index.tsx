import React from 'react';
import './index.scss'
const prefix = 'login'
export default function Login() {
    return (
        <div className={prefix}>
            <div className={`${prefix}-content`}>
                <div className={`${prefix}-content-left`}></div>
                <div className={`${prefix}-content-right`}></div>
            </div>
        </div>
    )
}