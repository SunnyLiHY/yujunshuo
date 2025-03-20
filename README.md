# react18前端脚手架

react18前端脚手架仓库；前端模板 react 项目，基于 rspack 构建，支持 qiankun.

## 开发

请先阅读钉钉文档：团队文件/01.行业应用中心文档库/08.前端技术规范/00. 微前端/03. 微前端主、子应用开发和联调

环境版本要求：
```
node 20.2.0
npm 9.6.6
pnpm 8.15.4
```

环境配置
```shell
# 安装依赖
pnpm install

# 启动应用
pnpm start
# 访问 http://10.11.14.211:30879/northern/dataList

# 根目录安装依赖
pnpm add qss -W -D

# 启用Rsdoctor（将编译行为及耗时进行可视化展示，方便开发查看构建问题）
pnpm analyze-build

# 构建
pnpm build
```

## 规范说明

### package 命名规范

package name 按照 @main/xxx 模式，英文小写，分隔符用中划线，例如 @main/core ，模块所在文件夹名则应为 core 。

若需要增加新模块，`package.json` 的 `name` 字段值为 `@react-main/xxx`。

在根目录下 `tsconfig.json` 的 `compilerOptions.paths` 字段增加如下配置：

```javascript
{
  // ...
  "@react-main/xxx": ["packages/xxx/src"],

  // 这里要求组件编译后不能打包，输出的 lib 目录与 src 保持完全一致。
  "@react-main/xxx/lib/*": ["packages/xxx/src/*"]
  // ...
}
```

### Git 分支管理策略
- master 生产环境版本(分支永为可交付的稳定版)
- stage 稳定版本(远程分支，构建完自动部署到测试环境。)
- dev 开发环境(远程分支自动构建到开发环境，可手动部署到指定环境)
- 个人特性分支：lhy/dev、feat/import-vector-data...

## 前端代码部署

### 将远程分支部署到环境（待完善）

- master 分支永为可交付的稳定版
- stage 远程分支自动构建，构建完自动部署到测试环境。
- dev 远程分支自动构建，可手动部署到指定环境。
