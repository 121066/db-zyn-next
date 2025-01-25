import React, { useEffect, useState } from "react";
import { getArticleByType, getArticleById, updateArticle, addArticle } from "@/api";
import { Article } from "@/types/article";
const useArticles = () => {
    const [articlesList, setArticlesList] = useState<Article[]>([])
    //    获取文章列表
    const getArticleList = async (params) => {
        const { data, success } = await getArticleByType(params)
        if (success && data.list) {
            setArticlesList(data.list)
        }
    }

    //获取文章详情
    const getArticleItems = async (params) => {
        const { data, success } = await getArticleById(params)
        if (success) {
            return data
        }
        return false
    }
    // 更新文章
    const updateArticleItems = async (params) => {
        return await updateArticle(params)

    }
    // 新增文章
    const addArticleItems = async (params) => {
        return await addArticle(params)
    }
    return { articlesList, getArticleList, getArticleItems, updateArticleItems, addArticleItems }
}
export default useArticles;