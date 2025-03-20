export * from './request';
export * from './function';
/**
 * 将骆驼命名规则的字符串转换成使用短横线命名法的字符串, 并且全小写 .例如: 'getElementById' => 'get-element-by-id'
 *
 * 例如: bdhPrimaryColor -> primary-color
 * @param str
 * @returns
 */
export const getKebabCase = (str: string) => {
  let temp = str.replace(/([A-Z])/g, '-$1').toLowerCase();
  if (temp.slice(0, 1) === '-') {
    // 如果首字母是大写，执行replace时会多一个_，需要去掉
    temp = temp.slice(1);
  }
  return temp;
};

/**
 * 将短横线命名规则的字符串转换成使用驼峰命名法的字符串
 *
 * 例如: primary-color -> bdhPrimaryColor
 * @param str
 * @returns
 */
export const getCamelCase = (str: string) => str.replace(/-([a-z])/g, (all, i) => i.toUpperCase());

export const uuid = () =>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 将驼峰命名法的css配置转换成自定义css变量字符串
 *
 * 例如: bdhMainColor -> --main-color
 * @param cssStyle
 * @returns string
 */
export const getRootCssProperty = (cssStyle: { [prop: string]: string }) => {
  const cssPropertyObj = Object.keys(cssStyle).map((colorName) => {
    const cssColorName = `--${getKebabCase(colorName)}`;
    return `${cssColorName}: ${cssStyle[colorName]};`;
  });
  return cssPropertyObj.join('');
};