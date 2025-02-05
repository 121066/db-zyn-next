// src/types/axios.d.ts
import 'axios';

declare module 'axios' {
    export interface AxiosResponse<T = any> {
        success?: boolean;  // 添加 success 属性
    }
}
