const basePath = 'https://dbyxs.top'
/**
 * 图片上传
 * */
export const uploadImage = async (params) => {
    const formData = new FormData();
    formData.append('file', params);
    // formData.append('type', 'daily') 
    const response = await fetch(`${basePath}/img`, {
        method: 'post',
        body: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
    const result = await response.json()
    return result
}
/**
 * 文件上传
 */
export const uploadFile = async (params) => {
    const formData = new FormData();
    formData.append('file', params);
    const response = await fetch(`${basePath}/api/oss/upload/doc`, {
        method: 'post',
        body: formData,
    })
    const result = await response.json()
    return result
}