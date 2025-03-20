import React, { useMemo } from 'react';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

/**
 * 生成一个 uuid，可以用于 dom 节点的 id 属性。由于 dom id 不能有特殊字符，所以这里限制了可能出现的字符。
 */
export const useDomId = () => {
  return useMemo(() => nanoid(), []);
};
