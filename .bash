#!/bin/bash

SERVICE_NAME="$1"
START_CMD="npm -- run start"

if [ -z "$SERVICE_NAME" ] || [ -z "$START_CMD" ]; then
  echo "用法: $0 服务名 '启动命令'"
  echo "示例: $0 text 'npm -- run start'"
  exit 1
fi

if pm2 list | grep -qw "$SERVICE_NAME"; then
  echo "服务 $SERVICE_NAME 已存在，执行 pm2 restart"
  pm2 restart "$SERVICE_NAME"
else
  echo "服务 $SERVICE_NAME 不存在，执行 pm2 start"
  pm2 start $START_CMD --name "$SERVICE_NAME"
fi