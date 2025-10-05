// src/app/api/ocr/route.ts
import { NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';
import { join } from 'path';

// yn/api/ocr - 处理OCR识别请求
export async function POST(request: Request) {
    try {
        // 处理文件上传
        const formData = await request.formData();
        const file = formData.get('image');
        // console.log('Uploaded file:', file);
        const data = await recognizeText(file)
        return NextResponse.json({
            data: data,
            success: true,
            code: 0
        })
    } catch (error) {
        console.error('OCR识别失败:', error);
        return NextResponse.json(
            { error: 'OCR识别失败: ' + (error.message || '未知错误') },
            { status: 500 }
        );
    }
}
const recognizeText = async (imageSrc) => {
    console.log('imageSrc', imageSrc)
    if (!imageSrc) return
    try {
        const reuslt = await Tesseract.recognize(imageSrc, 'eng+chi_sim', { logger: m => console.log(m) })
        return reuslt
    } catch (e) {
        console.log(e)
    }
}