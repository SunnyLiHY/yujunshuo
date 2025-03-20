/* eslint-disable @typescript-eslint/no-var-requires */
const { getRspackConfig } = require('@micro-react/config');
const rspack = require('@rspack/core');
const { name } = require('./package.json');
const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin');

// const publicPath = '/apps/micro-react18/';

// 不用charles，直接运行服务
const publicPath = '/';

module.exports = getRspackConfig({
  devServer: {
    port: 8079,
    hot: true,
    client: {
      // webSocketURL: 'ws://localhost:8075/ws',
    },
    // proxy: {
    //   // 代理多个路径到不同的后端服务
    //   '/api': {
    //     target: 'http://localhost:3000', // 设置代理请求的 Origin 头部，从而解决跨域问题。
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '' }, // 如果后端服务不需要 /api 前缀，可以通过 pathRewrite 将其去掉。
    //   },
    //   '/auth': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //   },
    // },
  },
  output: {
    library: {
      name: `${name}-[name]`,
    },
    chunkLoadingGlobal: `webpackJsonp_${name}`,
    publicPath,
  },
  plugins: [
    new rspack.DefinePlugin({
      'process.env.REACT_APP_PUBLIC_URL': JSON.stringify(publicPath),
    }),
    // 仅在 RSDOCTOR 为 true 时注册插件，因为插件会增加构建耗时
    process.env.RSDOCTOR &&
      new RsdoctorRspackPlugin({
        // 插件选项
      }),
  ],
});
