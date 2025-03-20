import React, { useMemo } from 'react';

/**
 * 获取页面顶部导航条的高度。
 *
 * 从 css 中读取自定义变量 `--micro-main-base-top-nav-height` 的值，将其转为数值，即为导航条的高度。
 */
export const useHeaderHeight = () => {
  return useMemo(() => {
    const value = getComputedStyle(document.querySelector(':root') as HTMLDivElement)
      .getPropertyValue('--micro-main-base-header-height')
      .trim();

    // '48px' -> 48
    return Number(value.replace(/\D+$/g, ''));
  }, []);
};
