// src/lib/db.ts
import mysql from 'mysql2/promise';

// 创建连接池
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'your_database_name',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;