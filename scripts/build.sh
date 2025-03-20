#!/bin/bash

set -e

# 打印全部环境变量
# export

echo "安装依赖..."
# 先临时安装 pnpm，后续使用 pnpm 镜像
# npm install -g pnpm
npm install -g pnpm@8 --registry=https://registry.npmmirror.com
pnpm install --no-frozen-lockfile

# echo "类型检查..."
# pnpm run type:check

echo "正在构建..."
pnpm run turbo:build


mkdir -p dist
cp -r ./packages/apps/main/dist/* ./dist/
