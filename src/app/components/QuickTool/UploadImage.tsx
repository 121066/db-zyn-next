import React, { useState, useRef } from "react";
import { Upload, Button, message, Modal, ModalProps, UploadProps, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Tesseract from 'tesseract.js'
interface IProps extends ModalProps, UploadProps {
    visible: boolean
    title: string
    onCancel: () => void
    onChange: (text: any) => void
}
const UploadImage = (props: IProps) => {
    const { visible, title = '图片上传', onCancel, onOk, onChange } = props
    const [modelVisible, setModelVisible] = useState<boolean>(visible)
    const [fileList, setFileList] = useState([]);
    const uploadRef = useRef(null);
    const [loading, setLoading] = useState<boolean>(false)
    const recognizeText = async (imageSrc) => {
        console.log('imageSrc', imageSrc)
        if (!imageSrc) return
        try {
            const reuslt = await Tesseract.recognize(imageSrc, 'eng+chi_sim', { logger: m => console.log(m) })
            setLoading(false)
            return reuslt
        } catch (e) {
            console.log(e)
        }
    }
    const handleCancel = () => {

        setFileList([]);
    };
    const handleUpload = async ({ file, fileList }) => {
        // console.log(file)
        setLoading(true)
        const data = await recognizeText(file.originFileObj)

        if (data && onChange) {
            onChange(data)
        }
    };
    const propsItem = {
        maxCount: 1,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('只能上传 JPG/PNG 文件！');
                setLoading(false)
            }
            return isJpgOrPng;
        },
        onChange: handleUpload,
        multiple: false,
        fileList,
    };
    const handlePaste = async (e) => {
        setLoading(true)
        const items = e.clipboardData.items;
        // console.log(clipboardData, '复制粘贴的数据')
        // const items = clipboardData.items;
        console.log(items, 'items')
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item && item.kind === 'file' && item.type.startsWith('image/')) {
                const file = item.getAsFile();
                const data = await recognizeText(file)
                if (data && onChange) {
                    onChange(data)
                    setLoading(false)
                    message.success('识别成功');
                } else {
                    setLoading(false)
                    message.error('识别失败');
                }
            }
        }

    };
    return <Modal title={title}
        open={modelVisible}
        onCancel={() => {
            setModelVisible(false)
            if (onCancel) {
                onCancel()
            }
        }}
        // onCancel={handleCancel}
        footer={[
            <Button key="cancel" onClick={() => {
                setModelVisible(false)
                if (onCancel) {
                    onCancel()
                }
            }}>
                取消
            </Button>,
            <Button loading={loading} key="upload" type="primary" onClick={() => console.log('开始批量上传文件:',)}>
                上传
            </Button>,
        ]}>
        <div onPaste={handlePaste}>
            <Spin spinning={loading} >
                <div className="mb-2 p-2 rounded-sm  border-sky-100 bg-slate-200" style={{ height: '100px' }}>
                    {loading && <p>识别中...</p>}
                    {!loading && <p>复制粘贴图片区域...</p>}
                </div>
            </Spin>
            <Upload.Dragger  {...propsItem} ref={uploadRef} >
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此处上传，也可复制截图粘贴上传</p>
                <p className="ant-upload-hint">支持单个或批量上传，仅支持 JPG/PNG 文件</p>
            </Upload.Dragger>
        </div>
    </Modal>
}
export default UploadImage;