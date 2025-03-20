import React, { useEffect, useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';

/**
 * 这里封装了一些与表格的搜索表单相关的操作，核心是 url 参数与搜索表单状态同步。
 *
 * 理解起来可能有点复杂。
 */
export const useTableForm = <TableParams,>({
  params,
  changed,
}: {
  /**
   * 当前的参数
   */
  params: TableParams;

  /**
   * 变更的标记, 从 false 到 true 或者反过来都意味着是一次变更
   */
  changed: boolean;
}) => {
  const formRef = useRef<ProFormInstance>();
  const cache = useRef<{ params?: TableParams; defaultParams?: TableParams }>({});

  cache.current.params = params;

  /**
   * 将表单初始值保存到 cache 中
   */
  useEffect(() => {
    const updateForm = () => {
      cache.current.defaultParams = formRef.current?.getFieldsValue();
    };
    if (formRef.current) {
      updateForm();
    } else {
      setTimeout(() => updateForm());
    }
  }, []);

  /**
   * url 中参数清空时，同步清空搜索表单
   */
  useEffect(() => {
    const updateForm = () => {
      formRef.current?.setFieldsValue({ ...cache.current.defaultParams, ...cache.current.params });
    };
    // 能立即更新则尽量立即更新
    if (formRef.current) {
      updateForm();
    } else {
      setTimeout(() => updateForm());
    }
  }, [changed]);

  return { formRef };
};
