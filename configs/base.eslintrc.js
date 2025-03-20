/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: '../tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    react: { version: '18.2.0' },
  },
  plugins: [],
  ignorePatterns: ['node_modules', 'lib', 'es', 'build', 'dist', '*.eslintrc.js'],
  rules: {
    /**
     * 使用 Typescript 时，该规则用处不大，TSC 能够捕获到相关的错误。
     * 且该规则需要额外的配置，与 monorepo 不一定契合。
     */
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],

    /**
     * 该规则对 monorepo 很重要，它用于检测每个包的依赖配置是否完整。
     * turborepo 生成依赖拓扑、公共组件发包也都需要正确配置依赖。
     */
    // 'import/no-extraneous-dependencies': 'error',

    /**
     * 使用 TS 静态类型检查，则不再需要该规则。
     * 参考官网：https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html
     */
    'react/prop-types': 'off',

    'react/display-name': 'off',

    /**
     * 改规则已过时，目前已不需要
     */
    'react/react-in-jsx-scope': 'off',

    /**
     * 与 @react-three/fiber 的设计冲突
     */
    // 'react/no-unknown-property': 'off',
    /**
     * any 使用过多，暂时屏蔽
     */
    '@typescript-eslint/no-explicit-any': 'off',
  }
};
