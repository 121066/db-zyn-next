// 定义一个接口来表示文章表（articles）中的一条记录的类型
export interface Article {
    // 文章的自增唯一标识符，通常为数字类型，在数据库中自动生成
    id?: number;
    // 文章的唯一标识符，使用通用唯一识别码（UUID）格式的字符串，长度为36
    uuid: string;
    // 文章的创建时间，类型为 Date，表示具体的日期和时间
    created_at: Date;
    // 创建文章的人员名称，字符串类型，最大长度在数据库中可能设为255，这里只是类型定义，不严格限制长度
    creator_name: string;
    // 创建文章的人员ID，同样是UUID格式的字符串，长度为36
    creator_id: string;
    // 文章类型，字符串类型，比如技术文章、新闻报道等，最大长度设为50
    article_type: string;
    // 文章内容，长文本类型，可存储较多的文字内容
    content: string;
    // 文章更新历史，以JSON格式存储，这里在TypeScript中可以使用any类型来表示，
    // 实际应用中如果能确定具体结构可定义更精确的类型，比如数组类型等
    update_history: [];
    // 文章的浏览量，数字类型，用于记录文章被查看的次数
    views_count: number;
    // 文章的点赞量，数字类型，统计文章获得点赞的数量
    likes_count: number;
    // 文章的评论量，数字类型，代表文章收到评论的数量
    comments_count: number;
    // 文章的浏览时间相关数据，以JSON格式存储，同样可以根据实际情况细化类型，这里先用any表示
    view_times: Date;
    // 备用字段1，字符串类型，最大长度为255，用于一些可能后续扩展或临时存储的信息
    backup_field_1: string;
    // 备用字段2，字符串类型，最大长度为255，类似backup_field_1的作用
    backup_field_2: string;
    // 备用字段3，字符串类型，最大长度为255，以备不时之需
    backup_field_3: string;
    // 是否删除的标记，布尔类型（在数据库中可能用tinyint等表示，映射到这里用布尔更符合逻辑），
    // false表示未删除，true表示已删除
    is_deleted: false;
    // 文章的删除状态，使用枚举类型，有'not_deleted'（未删除）和'deleted'（已删除）两种可能的值
    delete_status: 'not_deleted' | 'deleted';
    // 新增的技术类型字段，用于区分不同技术相关的文章，如'js'、'vue'、'react'、'java'等，字符串类型，最大长度设为50
    type: string; // 文章类型
    title: string; // 文章标题
    code_content: string;//代码内容
    css_content: string;//css内容
    html_content: string;//html内容
    // 文章的点赞状态，使用枚举类型，有'not_liked'（未点赞）和'liked'（已点赞）两种可能的值
    like_status?: 'not_liked' | 'liked';
    // 文章的评论状态，使用枚举类型，有'not_commented'（未评论）和'commented'（已评论）两种可能的值
}