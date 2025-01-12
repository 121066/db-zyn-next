/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: '/yn/',
    basePath: '/yn',
    typescript: {

        // !! 警告 !!
        // 在生产环境中忽略 TypeScript 错误
        // 这可能很危险，但有时是必要的
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig 