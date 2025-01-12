export interface LifeRecord {
    id?: number; // 记录ID，自增主键
    uuid?: string; // 通用唯一标识符
    created_at?: Date; // 创建时间
    creator_name?: string; // 创建者姓名
    creator_id?: string; // 创建者ID，默认为unknown
    record_type?: string; // 记录类型
    content: string; // 生活记录内容
    weather?: string; // 当天天气
    mood?: string; // 当天心情
    location?: string; // 所在地点
    activities?: string; // 当天活动
    food?: string; // 当天饮食
    sleep_time_start?: string; // 开始睡眠时间
    sleep_time_end?: string; // 结束睡眠时间
    exercise_duration?: number; // 运动时长（分钟）
    reading_duration?: number; // 阅读时长（分钟）
    social_interactions?: string; // 社交互动情况
    expenses?: number; // 当天支出金额
    // update_history?: Array<any>; // 更新历史记录（这里可以根据实际情况定义更具体的类型，如对象数组等）
    views_count?: number; // 查看次数
    likes_count?: number; // 点赞次数
    comments_count?: number; // 评论次数
    view_times?: object; // 查看时间记录（这里可以根据实际情况定义更具体的类型，如对象数组等）
    backup_field_1?: string; // 备份字段1
    backup_field_2?: string; // 备份字段2
    backup_field_3?: string; // 备份字段3
    is_deleted?: number; // 是否删除，0为未删除，1为已删除
    delete_status?: 'not_deleted' | 'deleted'; // 删除状态，枚举值：not_deleted（未删除）、deleted（已删除）
    type?: string; // 记录类型（可用于分类，如工作、休闲等）
    creator_ip?: string; // 创建者IP
    updated_at?: Date; // 更新时间
    updated_id?: string; // 更新者ID
    updater_ip?: string; // 更新者IP
    updater_name?: string; // 更新者姓名
    title?: string; // 标题
    backup_id?: string; // 备份ID
}