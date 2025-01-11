# 错误日志接口

1. 建表语句

```sql
CREATE TABLE error_log (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键，唯一标识每条错误日志',
    error_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '错误发生时间，默认为当前时间',
    error_level VARCHAR(20) COMMENT '错误级别，如 ERROR、WARN等',
    error_message TEXT COMMENT '错误消息，详细描述错误内容',
    error_source VARCHAR(255) COMMENT '错误来源，例如哪个模块或文件产生的错误',
    user_id INT COMMENT '用户ID，关联产生错误的用户（如果有）',
    request_url VARCHAR(255) COMMENT '请求的URL（如果是Web应用）',
    request_method VARCHAR(10) COMMENT '请求方法（如GET、POST等，如果是Web应用）',
    client_ip VARCHAR(45) COMMENT '客户端IP地址',
    browser_info VARCHAR(255) COMMENT '浏览器信息（如果是Web应用）',
    os_info VARCHAR(255) COMMENT '操作系统信息',
    stack_trace TEXT COMMENT '错误堆栈跟踪信息',
    custom_field1 VARCHAR(255) COMMENT '备用字段1',
    custom_field2 VARCHAR(255) COMMENT '备用字段2',
    custom_field3 VARCHAR(255) COMMENT '备用字段3'
);
```

## 创建错误日志

### 请求方法: POST

### 请求路径: /error_logs/add

### 请求参数:

- error_time: 错误发生时间 (类型: string)
- error_level: 错误级别 (类型: string)
- error_message: 错误消息 (类型: string)
- error_source: 错误来源 (类型: string)
- user_id: 用户 ID (类型: int)
- request_url: 请求的 URL (类型: string)
- request_method: 请求方法 (类型: string)
- client_ip: 客户端 IP 地址 (类型: string)
- browser_info: 浏览器信息 (类型: string)
- os_info: 操作系统信息 (类型: string)
- stack_trace: 错误堆栈跟踪信息 (类型: string)

### 响应参数:

- code: 状态码 (类型: number)
- message: 描述信息 (类型: string)
- data: 数据对象 (类型: object)
- id: 错误日志 ID (类型: number)

## 2. 查询所有错误日志

### 请求方法: GET

### 请求路径:/error_logs/list

### 请求参数:

- pageSize: 分页大小 (可选, 默认为 10, 类型: number)
- pageNum: 当前页数 (可选, 默认为 1, 类型: number)

## 响应参数:

- code: 状态码 (类型: number)
- message: 描述信息 (类型: string)
- data: 数据对象 (类型: object)
- total: 总记录数 (类型: number)
- list: 错误日志列表 (类型: array)
