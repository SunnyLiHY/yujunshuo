import { PUBLIC_URL } from './constant';

/**
 * 获取前端静态资源的完整路径
 */
export const getFullPath = (suffix: string) => {
  const { origin } = window.location;
  return `${origin}${PUBLIC_URL}${suffix}`;
};
