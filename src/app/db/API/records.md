### 生活记录

```sql
CREATE TABLE life_records (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID，自增主键',
    uuid VARCHAR(36) NOT NULL COMMENT '通用唯一标识符',
    created_at TIMESTAMP NULL DEFAULT NULL COMMENT '创建时间',
    creator_name VARCHAR(255) NOT NULL COMMENT '创建者姓名',
    creator_id VARCHAR(36) NULL DEFAULT 'unknown' COMMENT '创建者ID，默认为unknown',
    record_type VARCHAR(50) NULL DEFAULT NULL COMMENT '记录类型',
    content TEXT NOT NULL COMMENT '生活记录内容',
    weather VARCHAR(50) NULL DEFAULT NULL COMMENT '当天天气',
    mood VARCHAR(50) NULL DEFAULT NULL COMMENT '当天心情',
    location VARCHAR(255) NULL DEFAULT NULL COMMENT '所在地点',
    activities TEXT NULL DEFAULT NULL COMMENT '当天活动',
    food TEXT NULL DEFAULT NULL COMMENT '当天饮食',
    sleep_time_start TIME NULL DEFAULT NULL COMMENT '开始睡眠时间',
    sleep_time_end TIME NULL DEFAULT NULL COMMENT '结束睡眠时间',
    exercise_duration INT NULL DEFAULT NULL COMMENT '运动时长（分钟）',
    reading_duration INT NULL DEFAULT NULL COMMENT '阅读时长（分钟）',
    social_interactions TEXT NULL DEFAULT NULL COMMENT '社交互动情况',
    expenses DECIMAL(10, 2) NULL DEFAULT NULL COMMENT '当天支出金额',
    update_history JSON NULL DEFAULT NULL COMMENT '更新历史记录',
    views_count INT NULL DEFAULT 0 COMMENT '查看次数',
    likes_count INT NULL DEFAULT 0 COMMENT '点赞次数',
    comments_count INT NULL DEFAULT 0 COMMENT '评论次数',
    view_times JSON NULL DEFAULT NULL COMMENT '查看时间记录',
    backup_field_1 VARCHAR(255) NULL DEFAULT NULL COMMENT '备份字段1',
    backup_field_2 VARCHAR(255) NULL DEFAULT NULL COMMENT '备份字段2',
    backup_field_3 VARCHAR(255) NULL DEFAULT NULL COMMENT '备份字段3',
    is_deleted TINYINT(1) NULL DEFAULT 0 COMMENT '是否删除，0为未删除，1为已删除',
    delete_status ENUM('not_deleted', 'deleted') NULL DEFAULT 'not_deleted' COMMENT '删除状态，枚举值：not_deleted（未删除）、deleted（已删除）',
    type VARCHAR(50) NULL DEFAULT NULL COMMENT '记录类型（可用于分类，如工作、休闲等）',
    creator_ip VARCHAR(45) NULL DEFAULT NULL COMMENT '创建者IP',
    updated_at DATETIME NULL DEFAULT NULL COMMENT '更新时间',
    updated_id VARCHAR(45) NULL DEFAULT NULL COMMENT '更新者ID',
    updater_ip VARCHAR(45) NULL DEFAULT NULL COMMENT '更新者IP',
    updater_name VARCHAR(45) NULL DEFAULT NULL COMMENT '更新者姓名'
);
```

## 1. 创建生活记录 请求方法: POST

### 请求路径: /life_records/add

### 请求参数:

uuid: 通用唯一标识符 (必填, 类型: string)
• created_at: 创建时间 (可选, 类型: string)
• creator_name: 创建者姓名 (必填, 类型: string)
• creator_id: 创建者 ID (可选, 默认为 'unknown', 类型: string)
• record_type: 记录类型 (可选, 类型: string)
• content: 生活记录内容 (必填, 类型: string)
• weather: 当天天气 (可选, 类型: string)
• mood: 当天心情 (可选, 类型: string)
• location: 所在地点 (可选, 类型: string)
• activities: 当天活动 (可选, 类型: string)
• food: 当天饮食 (可选, 类型: string)
• sleep_time_start: 开始睡眠时间 (可选, 类型: string)
• sleep_time_end: 结束睡眠时间 (可选, 类型: string)
• exercise_duration: 运动时长（分钟） (可选, 类型: int)
• reading_duration: 阅读时长（分钟） (可选, 类型: int)
• social_interactions: 社交互动情况 (可选, 类型: string)
• expenses: 当天支出金额 (可选, 类型: decimal)
• update_history: 更新历史记录 (可选, 类型: JSON)
• views_count: 查看次数 (可选, 默认为 0, 类型: int)
• likes_count: 点赞次数 (可选, 默认为 0, 类型: int)
• comments_count: 评论次数 (可选, 默认为 0, 类型: int)
• view_times: 查看时间记录 (可选, 类型: JSON)
• backup_field_1: 备份字段 1 (可选, 类型: string)
• backup_field_2: 备份字段 2 (可选, 类型: string)
• backup_field_3: 备份字段 3 (可选, 类型: string)
• is_deleted: 是否删除 (可选, 默认为 0, 类型: tinyint)
• delete_status: 删除状态 (可选, 默认为 'not_deleted', 类型: enum)
• type: 记录类型 (可选, 类型: string)
• creator_ip: 创建者 IP (可选, 类型: string)
• updated_at: 更新时间 (可选, 类型: datetime)
• updated_id: 更新者 ID (可选, 类型: string)
• updater_ip: 更新者 IP (可选, 类型: string)
• updater_name: 更新者姓名 (可选, 类型: string)

### 响应参数:

• code: 状态码 (类型: number)
• message: 描述信息 (类型: string)
• data: 数据对象 (类型: object)

```json
{
  "code": 200,
  "message": "成功",
  "data": {}
}
```

### 2. 获取所有生活记录 请求方法: GET

请求路径: /life_records/list
