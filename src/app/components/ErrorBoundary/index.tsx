// components/ErrorBoundary.js
import React from 'react';
interface ErrorBoundaryState {
    hasError: boolean;
}
interface ErrorBoundaryProps {
    children: React.ReactNode;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // 更新状态以便下次渲染时显示备用 UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // 可以将错误日志记录到错误报告服务
        console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 可以渲染任何自定义的降级 UI
            return <h1>出错了！请稍后再试。</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;