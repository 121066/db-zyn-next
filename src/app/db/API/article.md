### 文章 CRUD 接口文档

#### 1. 创建文章

**请求方法**: POST  
**请求路径**: `/articles/add`  
**请求参数**:

- `content`: 文章内容 (必填, 类型: string)
- `creator_name`: 创建人名称 (必填, 类型: string)
- `creator_id`: 创建人 ID (可选, 类型: string)
- `article_type`: 文章类型 (可选, 类型: string)
- `update_history`: 更新历史 (可选, 类型: JSON)

**响应参数**:

- `code`: 状态码 (类型: number)
- `message`: 描述信息 (类型: string)
- `data`: 数据对象 (类型: object)
  - `id`: 文章 ID (类型: number)

**示例请求**:

```json
{
  "content": "This is the content of the article.",
  "creator_name": "John Doe",
  "creator_id": "user123",
  "article_type": "tutorial"
}
```

**示例响应**:

```json
{
  "code": 200,
  "message": "文章创建成功",
  "data": {
    "id": 1
  }
}
```

# 2. 获取所有文章

## 请求方法: GET

## 请求路径: `/articles/list`

### 请求参数:

- **pageSize**: 分页大小（可选，默认值为 10，类型: number）
- **pageNum**: 当前页数（可选，默认值为 1，类型: number）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）
- **data**: 数据对象（类型: object）
  - **list**: 文章列表（类型: array）
  - **total**: 总记录数（类型: number）
  - **pageNum**: 当前页数（类型: number）
  - **pageSize**: 分页大小（类型: number）

### 示例请求:

```json
{
  "pageSize": 10,
  "pageNum": 1
}
```

## 示例响应:

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": 1,
        "uuid": "123e4567-e89b-12d3-a456-426614174000",
        "created_at": "2023-10-01 12:00:00",
        "creator_name": "John Doe",
        "creator_id": "user123",
        "article_type": "tutorial",
        "content": "This is the content of the article.",
        "update_history": [],
        "views_count": 0,
        "likes_count": 0,
        "comments_count": 0,
        "view_times": null,
        "backup_field_1": null,
        "backup_field_2": null,
        "backup_field_3": null,
        "is_deleted": 0,
        "delete_status": "not_deleted",
        "type": "tutorial",
        "creator_ip": "::ffff:127.0.0.1",
        "updated_at": null,
        "updated_ip": null,
        "updater_ip": null,
        "updater_name": null,
        "title": "定位元素的几种区分"
      }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

# 3. 获取单篇文章

## 请求方法: GET

## 请求路径: `/articles/:ids`

### 请求参数:

- **ids**: 文章 ID（必填，类型: number）
- **uuid**: 文章 UUID（可选，类型: string）
- **type**: 文章类型（可选，类型: string）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）
- **data**: 文章数据（类型: object）
  - **id**: 文章 ID（类型: number）
  - **uuid**: 文章 UUID（类型: string）
  - **created_at**: 创建时间（类型: string）
  - **creator_name**: 创建者名称（类型: string）
  - **creator_id**: 创建者 ID（类型: string）
  - **article_type**: 文章类型（类型: string）
  - **content**: 文章内容（类型: string）
  - **update_history**: 更新历史（类型: array）
  - **views_count**: 浏览次数（类型: number）
  - **likes_count**: 点赞次数（类型: number）
  - **comments_count**: 评论次数（类型: number）
  - **view_times**: 查看时间（类型: null 或 string）
  - **backup_field_1**: 备用字段 1（类型: null 或其他）
  - **backup_field_2**: 备用字段 2（类型: null 或其他）
  - **backup_field_3**: 备用字段 3（类型: null 或其他）

### 示例请求:

```
{
    "ids": 1,
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "type": "tutorial"
}
```

## 示例响应:

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "created_at": "2023-10-01 12:00:00",
    "creator_name": "John Doe",
    "creator_id": "user123",
    "article_type": "tutorial",
    "content": "This is the content of the article.",
    "update_history": [],
    "views_count": 0,
    "likes_count": 0,
    "comments_count": 0,
    "view_times": null,
    "backup_field_1": null,
    "backup_field_2": null,
    "backup_field_3": null,
    "is_deleted": 0,
    "delete_status": "not_deleted",
    "type": "tutorial",
    "creator_ip": "::ffff:127.0.0.1",
    "updated_at": null,
    "updated_ip": null,
    "updater_ip": null,
    "updater_name": null,
    "title": "定位元素的几种区分"
  }
}
```

# 4. 更新或新增文章

## 请求方法: PUT

## 请求路径: `/articles/:id`

### 请求参数:

- **id**: 文章 ID（必填，类型: number）
- **uuid**: 文章 UUID（可选，类型: string）
- **type**: 文章类型（可选，类型: string）
- **content**: 文章内容（必填，类型: string）
- **creator_name**: 创建者名称（必填，类型: string）
- **creator_id**: 创建者 ID（可选，类型: string）
- **article_type**: 文章类型（可选，类型: string）
- **update_history**: 更新历史（可选，类型: JSON）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）

### 示例请求:

```json
{
  "id": 1,
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "type": "tutorial",
  "content": "Updated content of the article.",
  "creator_name": "John Doe",
  "creator_id": "user123",
  "article_type": "tutorial"
}
```

## 示例响应:

```json
{
  "code": 200,
  "message": "文章更新成功"
}
```

# 5. 删除文章

## 请求方法: DELETE

## 请求路径: `/articles/:id`

### 请求参数:

- **id**: 文章 ID（必填，类型: number）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）

### 示例请求:

```json
{
  "id": 1
}
```

## 示例响应:

```json
{
  "code": 200,
  "message": "文章删除成功"
}
```
