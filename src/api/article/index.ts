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