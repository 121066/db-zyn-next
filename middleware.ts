import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 定义允许访问的域名
const ALLOWED_HOST = 'localhost.dbyxs.top';

// 中间件会匹配所有请求路径（可根据需要调整匹配规则）
export function middleware(request: NextRequest) {
    // 获取请求的 Host 头
    const requestHost = request.headers.get('host') || '';

    // 检查 Host 是否匹配允许的域名（忽略端口，比如 localhost.dbyxs.top:3000 也允许）
    const isAllowed = requestHost.startsWith(ALLOWED_HOST);

    if (!isAllowed) {
        // 拒绝访问：返回 403 错误
        return new NextResponse('Forbidden: Only localhost.dbyxs.top is allowed', {
            status: 403,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    // 允许访问：继续处理请求
    return NextResponse.next();
}

// 配置中间件匹配的路径（匹配所有路径）
export const config = {
    matcher: '/:path*',
};