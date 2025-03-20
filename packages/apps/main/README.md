# 脚手架 APP

## 常用命令

```shell
# 启动
pnpm start

# 构建
pnpm build

# 打包分析
pnpm analyze
```

## charles 代理配置

```plain
match: http://10.11.14.211:30879/apps/micro-react18/(.*)
replace: http://localhost:8090/apps/micro-react18/$1
```

注意： “apps/micro-react18”要与注册到主应用的配置保持一致

```json
{
  /**
   * react18子应用配置
   */
  "sysCodePattern": "micro-react18",
  "subapps": [
    {
      "entry": "/apps/micro-react18/",
      "activeRule": "/micro-react18",
      "sandbox": { "experimentalStyleIsolation": true }
    }
  ]
}
```
