// src/types/request.ts
import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestOptions extends AxiosRequestConfig {
    loading?: boolean
    showError?: boolean
    showSuccess?: boolean
    showMsg?: boolean
    msg?: string
    success?: boolean
    code?: number
    withCredentials?: boolean
}

export interface ApiResponse<T = any> extends AxiosResponse {
    code: number
    message: string
    data: T
    success: boolean
}
export interface BaseResult {
    code: number
    message: string
    data: any
    success: boolean
}
