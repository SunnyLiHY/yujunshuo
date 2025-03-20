import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { encode, decode } from 'qss';

const toSearch = <Params extends object>(value: Params) => {
  const strJson = JSON.stringify(value);
  // 重要：将逗号替换为分号
  const q = strJson.replace(/,/g, ';');
  return encode({ q });
};

const parseObj = <T extends object>(str: string) => {
  if (!str) {
    return null;
  }
  try {
    // 重要：将分号替换为逗号
    const strJson = str.replace(/;/g, ',');
    return JSON.parse(strJson) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 将状态存储到 url 中。
 *
 * > **注意：**不要试图将数据转为 JSON 字符串存储直接存储到 url 中，这会引起其它用到 vue-router3 的子应用出现 bug。
 * > url 参数会同步到顶部的 tabs 组件，而当进入到 vue-router3 子应用时，再点击 tab 返回，则页面会出现错乱，路由闪跳。
 * > 经过一系列的分析，认为是 vue-router3 的不支持 url 中出现逗号。而 vue-router4、react-router 均不会出现改问题。
 * > 所以目前的解决方案是将 JSON 字符串中的逗号替换为分号。
 *
 * @param defaultValue 初始值
 */
export const useParamsFromUrl = <Params extends object>(defaultValue: Params) => {
  const location = useLocation();
  const navigate = useNavigate();

  const cacheRef = useRef<{ navigate: typeof navigate; location: typeof location; defaultValue: Params }>({
    location,
    navigate,
    defaultValue,
  });
  cacheRef.current = { location, navigate, defaultValue };

  const params = useMemo(() => {
    const { defaultValue } = cacheRef.current;
    const q = decode<{ q: string }>(location.search.substring(1)).q || '';
    return parseObj<Params>(q) || defaultValue;
  }, [location.search]);

  const setParams = useCallback((value: Params) => {
    const { location, navigate } = cacheRef.current;
    navigate(`${location.pathname}?${toSearch(value)}`);
  }, []);

  return [params, setParams] as [Params, typeof setParams];
};
