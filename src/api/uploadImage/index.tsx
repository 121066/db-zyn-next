const basePath = 'https://dbyxs.top'
/**
 * 图片上传
 * */
export const uploadImage = async (params) => {
    const formData = new FormData();
    formData.append('file', params);
    // formData.append('type', 'daily') 
    const response = await fetch(`${basePath}/api/image-list`, {
        method: 'post',
        body: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
    const result = await response.json()
    return result
}
