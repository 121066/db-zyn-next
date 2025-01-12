const basePath = 'https://dbyxs.top/api'
/**
 * 获取记录列表
 */
export const getRecordList = async (params) => {
    const response = await fetch(`${basePath}/life_records/list`, {
        method: 'get',
        // body: JSON.stringify(params)
        headers: {
            'Content-Type': 'application/json'
        }
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
        }
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
        }
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
        }
    })
    const result = await response.json()
    return result
}