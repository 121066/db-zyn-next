import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: '#237ffa', // 品牌色
        'brand-gray': '#F2F4F7', // 品牌色/灰
        'brand-b10': '#E2F3FE', // 品牌色/10%
        danger: '#ff5959', // 危险提示
        'danger-light': '#ffd1c9', // 危险提示/浅
        warning: '#FAB007', // 警告提示
        'warning-light': '#FEF2B4', // 警告提示/浅
        success: '#14CA64', // 成功提示
        'success-light': '#B3F2C6', // 成功提示/浅
        info: '#237FFA', // 信息提示
        'info-light': '#BDE2FF', // 信息提示/浅

        /** 基础色 */
        white: '#FFFFFF', // 白色
        placeholder: '#B5BCC7', // placeholder提示色
        divider: '#EBEDF0', // 分割线
        'divider-dark': '#DFE2E8', // 分割线/深
        // 背景色/常规
        base: '#F2F4F7',
        // 背景色/浅
        'base-light': '#F5F7FA',

        /** 字体颜色 */
        'ft-primary': '#1F2733', // 主要文字颜色
        'ft-secondary': '#5F6A7A', // 次要文字颜色
        'ft-placeholder': '#929AA6', // 占位符文字颜色
        'ft-link': '#237FFA' // 链接文字颜色
      },
      fontSize: {
        h1: ['32px', '44px'],
        h2: ['24px', '36px'],
        h3: ['18px', '32px'],
        h4: ['16px', '24px'],
        normal: ['14px', '20px'],
        bs: ['14px', '20px'],
        sm: ['12px', '20px'],
        mid: ['18px', '24px']
      },
    },
  },
  plugins: [],
} satisfies Config;
