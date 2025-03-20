/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const path = require('path');
const rspack = require('@rspack/core');

// 用时间戳当做默认名字
const name = Date.now();

// process.env.NODE_ENV: 'production' | 'development' | 'none';

/**
 * 目前看 rspack 似乎不支持 tsconfig 继承，因此这里直接指向根目录的 tsconfig
 * 如果支持继承，则这里可改为： path.resolve(process.cwd(), './tsconfig.json')
 */
const tsConfigPath = path.resolve(__dirname, '../../tsconfig.json');

/** @type {import('@rspack/cli').Configuration} */
const configBase = {
  entry: {
    main: './src/index.tsx', // 配置项目入口文件
  },
  output: {
    filename: '[name]_[contenthash].js', // 默认值： '[name].js'
    library: {
      name: `${name}-[name]`,
      type: 'umd',
    },
    chunkLoadingGlobal: `webpackJsonp_${name}`,

    /**
     * 各个项目自行配置 PUBLIC_PATH
     */
    publicPath: '',
    assetModuleFilename: 'static/media/[hash][ext][query]',
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './index.html' }),
  ],
  experiments: {
    css: true,
  },
  module: {
    parser: {
      'css/module': {
        /**
         * // 命名空间导出
         * import * as classes from './index.module.css';
         *
         * // 命名导出
         * import { class1, class2 } from './index.module.css';
         *
         * // 默认导出
         * import classes from './index.module.css';
         *
         * // 默认导出和命名导出
         * import classes, { class1, class2 } from './index.module.css';
         */
        namedExports: false,
      },
    },
    generator: {
      // css/module 模块的生成器选项
      'css/module': {
        // 默认值 '[uniqueName]-[id]-[local]
        localIdentName: '[local]-[hash]',
      },
    },
    rules: [
      {
        test: /\.scss$/,
        use: ['postcss-loader'],
        type: 'css',
      },
      {
        test: /\.module\.scss$/,
        use: ['postcss-loader'],
        type: 'css/module',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
          },
        ],
        type: 'css',
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx)$/],
        },
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            target: 'es2021',
            parser: {
              syntax: 'typescript',
              tsx: true,
              decorators: true
            },
            externalHelpers: false,
            preserveAllComments: false,
            transform: {
              react: {
                runtime: 'automatic',
                throwIfNamespace: true,
                useBuiltins: false,
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
    // rspack无相关配置，关闭unknownContextCritical，Webpack 会将未知上下文错误作为告警，而不是视为严重错误，不终止构建，这不利于开发者及时发现并修复问题。
    // unknownContextCritical: false,
  },
  devServer: {
    port: 8085,
    hot: true,
    historyApiFallback: true,
    static: true,
  },
  resolve: {
    tsConfigPath,
    fallback: { https: false, zlib: false, http: false, url: false },
    extensions: ['...', '.tsx', '.ts', '.jsx'],
  },
  // 升级到css后，存在css order告警，order顺序正常关闭warning，详见： https://github.com/web-infra-dev/rspack/issues/6168
  ignoreWarnings: [/Conflicting order/]
};

module.exports = (config) => merge(configBase, config);
