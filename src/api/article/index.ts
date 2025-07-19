const basePath = 'https://dbyxs.top/api'
/**
 * 获取文章列表
 */
export const getArticleList = async (params) => {
    const response = await fetch(`${basePath}/articles/list`, {
        method: 'get',
        body: JSON.stringify(params)
    })
    const result = await response.json()
    return result
}
/***
 * 新增文章 POST    
 */
export const addArticle = async (params) => {
    const response = await fetch(`${basePath}/articles/add`, {
        method: 'post',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}
// 获取文章
export const getArticle = async (params) => {
    let url = `${basePath}/articles/${params.id}`
    if (params.uuid) {
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
/***
 * 更新文章put
 */
export const updateArticle = async (params) => {
    const response = await fetch(`${basePath}/articles/${params.id}`, {
        method: 'put',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}
/**
 * 根据类型获取文章
 **/
export const getArticleByType = async (params) => {
    const response = await fetch(`${basePath}/articles/list/type?type=${params.type}&pageSize=30&pageNum=${params.pageNum || 1}&title=${params.title || ''}`, {
        method: 'get',
        credentials: 'same-origin',
        // body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}
/**
 * 根据id获取单篇文章
 */
export const getArticleById = async (params) => {
    const response = await fetch(`${basePath}/articles/item/${params.id}`, {
        method: 'get',
        credentials: 'same-origin',
        // body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}