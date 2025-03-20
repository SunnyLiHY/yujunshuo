/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./configs/base.eslintrc.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
