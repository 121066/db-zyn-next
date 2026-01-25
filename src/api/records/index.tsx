// const basePath = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dbyxs.top/api'
const basePath = 'https://dbyxs.top/api'

// console.log(process.env.NEXT_PUBLIC_BASE_PATH)
// console.log(process.env.NEXT_PUBLIC_API_BASE_URL, '测试')
/**
 * 获取记录列表
 */
export const getRecordList = async (params) => {
    const response = await fetch(`${basePath}/life_records/list?pageSize=999`, {
        method: 'get',
        // body: JSON.stringify(params)
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'  // 添加这一行来携带cookies
    })
    const result = await response.json()
    return result
}
/**
 *新增记录
*/
export const addRecord = async (params) => {
    const response = await fetch(`${basePath}/life_records/add`, {
        method: 'post',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'  // 添加这一行来携带cookies
    })
    const result = await response.json()
    return result
}
/***
 * 获取单个记录
 */
export const getRecord = async (params) => {
    let url = `${basePath}/life_records/${params.id || params.backup_id}`
    if (params.backup_id) {
        url += `?${new URLSearchParams(params).toString()}`
    }
    const response = await fetch(url, {
        method: 'get',
        // body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'  // 添加这一行来携带cookies
    })
    const result = await response.json()
    return result
}
/**
 * 更新记录
 **/
export const updateRecord = async (params) => {
    const response = await fetch(`${basePath}/life_records/${params.id}`, {
        method: 'put',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'  // 添加这一行来携带cookies
    })
    const result = await response.json()
    return result
}