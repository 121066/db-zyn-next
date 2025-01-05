# 1. 创建文章类型

## 请求方法: POST

## 请求路径: `/article_types/add`

### 请求参数:

- **article_type**: 文章类型（必填，类型: string）
- **sub_type**: 文章子类型（可选，类型: string）
- **article_chinese_name**: 文章的中文名称（必填，类型: string）
- **article_image_url**: 文章图片的地址（可选，类型: string）
- **creator_id**: 创建人 ID（必填，类型: int）
- **creator_name**: 创建人的名称（必填，类型: string）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）
- **data**: 数据对象（类型: object）
  - **id**: 文章类型 ID（类型: number）

### 示例请求:

```json
{
  "article_type": "教程",
  "sub_type": "编程教程",
  "article_chinese_name": "编程教程",
  "article_image_url": "https://example.com/image.jpg",
  "creator_id": 1,
  "creator_name": "John Doe"
}
```

## 响应示例:

```json
{
  "code": 200,
  "message": "文章类型创建成功",
  "data": {
    "id": 1
  }
}
```

# 2. 获取所有文章类型

## 请求方法: GET

## 请求路径: `/article_types/list`

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）
- **data**: 数据对象（类型: object）
  - **list**: 文章类型列表（类型: array）
    - **id**: 文章类型 ID（类型: number）
    - **article_type**: 文章类型（类型: string）
    - **sub_type**: 文章子类型（类型: string）
    - **article_chinese_name**: 文章的中文名称（类型: string）
    - **article_image_url**: 文章图片的地址（类型: string）
    - **creator_id**: 创建人 ID（类型: number）
    - **creator_name**: 创建人的名称（类型: string）
    - **created_at**: 创建时间（类型: string）
    - **is_deleted**: 是否删除（类型: number）
    - **delete_status**: 删除状态（类型: string）
    - **uuid**: 文章 UUID（类型: string）
  - **total**: 总记录数（类型: number）

### 示例响应:

```
{
    "code": 200,
    "message": "获取成功",
    "data": {
        "list": [
            {
                "id": 1,
                "article_type": "教程",
                "sub_type": "编程教程",
                "article_chinese_name": "编程教程",
                "article_image_url": "https://example.com/image.jpg",
                "creator_id": 1,
                "creator_name": "John Doe",
                "created_at": "2023-10-01 12:00:00",
                "is_deleted": 0,
                "delete_status": "not_deleted",
                "uuid": "123e4567-e89b-12d3-a456-426614174000"
            }
        ],
        "total": 1
    }
}
```

# 3. 获取单个文章类型

## 请求方法: GET

## 请求路径: `/article_types/:id`

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）
- **data**: 文章类型数据（类型: object）
  - **id**: 文章类型 ID（类型: number）
  - **article_type**: 文章类型（类型: string）
  - **sub_type**: 文章子类型（类型: string）
  - **article_chinese_name**: 文章的中文名称（类型: string）
  - **article_image_url**: 文章图片的地址（类型: string）
  - **creator_id**: 创建人 ID（类型: number）
  - **creator_name**: 创建人的名称（类型: string）
  - **created_at**: 创建时间（类型: string）
  - **is_deleted**: 是否删除（类型: number）
  - **delete_status**: 删除状态（类型: string）
  - **uuid**: 文章 UUID（类型: string）

### 示例响应:

```
{
    "code": 200,
    "message": "获取成功",
    "data": {
        "id": 1,
        "article_type": "教程",
        "sub_type": "编程教程",
        "article_chinese_name": "编程教程",
        "article_image_url": "https://example.com/image.jpg",
        "creator_id": 1,
        "creator_name": "John Doe",
        "created_at": "2023-10-01 12:00:00",
        "is_deleted": 0,
        "delete_status": "not_deleted",
        "uuid": "123e4567-e89b-12d3-a456-426614174000"
    }
}
```

# 4. 更新文章类型

## 请求方法: PUT

## 请求路径: `/article_types/:id`

### 请求参数:

- **id**: 文章类型 ID（必填，类型: number）
- **article_type**: 文章类型（必填，类型: string）
- **sub_type**: 文章子类型（可选，类型: string）
- **article_chinese_name**: 文章的中文名称（必填，类型: string）
- **article_image_url**: 文章图片的地址（可选，类型: string）
- **creator_id**: 创建人 ID（必填，类型: int）
- **creator_name**: 创建人的名称（必填，类型: string）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）

### 示例请求:

```json
{
  "id": 1,
  "article_type": "教程",
  "sub_type": "编程教程",
  "article_chinese_name": "编程教程",
  "article_image_url": "https://example.com/image.jpg",
  "creator_id": 1,
  "creator_name": "John Doe"
}
```

## 响应示例:

```
{
    "code": 200,
    "message": "文章类型更新成功"
}
```

# 5. 删除文章类型

## 请求方法: DELETE

## 请求路径: `/article_types/:id`

### 请求参数:

- **id**: 文章类型 ID（必填，类型: number）

### 响应参数:

- **code**: 状态码（类型: number）
- **message**: 描述信息（类型: string）

### 示例请求:

```json
{
  "id": 1
}
```

## 响应示例:

```json
{
  "code": 200,
  "message": "文章类型删除成功"
}
```
