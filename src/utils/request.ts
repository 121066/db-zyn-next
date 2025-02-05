// src/utils/request.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { RequestOptions, ApiResponse, BaseResult } from '@/types/request'
import { getCookie } from './cookie'
// 创建 axios 实例
const request: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://dbyxs.top',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
})
export interface BaseResponse<T = any> {
    code: number
    message?: string
    data?: T
    success: boolean
    headers?: Record<string, string>
}
export type BaseResponsePromise<T = any> = Promise<BaseResponse<T>>
// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 获取 token
        const token = getCookie()
        if (token) {
            // 将 token 添加到请求头中
            config.headers['Authorization'] = `Bearer ${token}`
            // 如果是跨域请求，需要设置
            // config.withCredentials = true; // 允许跨域携带 cookie
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<BaseResult>>) => {
        const { data } = response

        // 这里可以根据后端的错误码进行处理
        if (data.code !== 200) {
            return Promise.reject(new Error(data.message))
        }

        return data
    },
    (error: AxiosError) => {
        // 处理 HTTP 错误
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // window.location.href = "login";

                    // 处理未授权
                    break
                case 403:
                    // 处理禁止访问
                    break
                case 404:
                    // 处理未找到
                    break
                case 500:
                    // 处理服务器错误
                    break
            }
        }
        return Promise.reject(error)
    },
)

// 封装请求方法
export const http = {
    get: <T = any>(url: string, params?: any, options?: RequestOptions) => {
        return request.get<any, ApiResponse<T>>(url, { params, ...options })
    },

    post: <T = any>(url: string, data?: any, options?: RequestOptions) => {
        return request.post<any, ApiResponse<T>>(url, data, options)
    },

    put: <T = any>(url: string, data?: any, options?: RequestOptions) => {
        return request.put<any, ApiResponse<T>>(url, data, options)
    },

    delete: <T = any>(url: string, params?: any, options?: RequestOptions) => {
        return request.delete<any, ApiResponse<T>>(url, { params, ...options })
    },
}

export default request
