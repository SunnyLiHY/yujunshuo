/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'jotai';

/**
 * 包裹 Jotai 的 Provider 以限定状态作用域范围
 *
 * @example
 * ```ts
 * const DashboardComposed = compose(
 *   // 这些都是单参数的 HOC
 *   withJotai,
 * )(Dashboard);
 * ```
 *
 * @param 被包裹的组件
 * @returns 已包裹 Jotai 的 Provider 之后的组件
 */
export const withJotai = <Props extends Record<string, unknown>>(WrappedComponent: React.ComponentType<Props>) => {
  // 为 React Dev Tools 生成一个 displayName .
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithJotai = (props: Props) => (
    <Provider>
      <WrappedComponent {...props} />
    </Provider>
  );

  ComponentWithJotai.displayName = `withJotai(${displayName})`;
  return ComponentWithJotai;
};
