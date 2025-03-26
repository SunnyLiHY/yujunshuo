import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spin, ConfigProvider, theme, Result } from 'antd';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Layout } from './components/Layout/Layout';
import styles from './App.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * 全部使用异步加载页面, 要求页面组件 export default
 */
const Developing = lazy(() => import('./pages/Developing'));
const Mentors = lazy(() => import('./pages/Mentors'));
const Demands = lazy(() => import('./pages/Demands'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));

// 页面入口权限点
// const DevelopingComposed = withAuth([''])(withJotai(Developing));
/**
 * 根据当前 url 自动提取路由前缀。
 *
 * 例如: /resource-manage/projectManage/projectConfig -> /resource-manage
 */
const basename = window.location.pathname.match(/^(\/.+?)\//)?.[1] ?? '';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Navigate to="/index" replace />} />
      <Route path="/" element={<Layout />}>
        <Route path="index" element={<Developing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/demands" element={<Demands />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        path="*"
        element={
          <Result
            icon={<img src="/oss-static-api/micro/main/404.png" />}
            title="404"
            subTitle="抱歉，您当前访问的页面不存在。"
          />
        }
      />
    </>,
  ),
  { basename },
);

// 主应用配置了实现主应用与子应用、子应用之间严格的样式隔离；
// 要求全局更改 antd 的 getPopupContainer 值，避免 Tooltip、Popover、Message、Notification、Modal 等 Portal 组件丢失 样式。
const getPopupContainer = (triggerNode?: HTMLElement): HTMLElement => (window as any).container;

const App: React.FC = () => {
  // 获取主应用配置
  const themeValue = (window as any).bdhMicroMainEvents?.useTheme?.({ react: React, theme });
  // 订阅主应用用户自定义下拉菜单点击事件
  // (window as any).bdhMicroMainEvents?.avatarClickEvent?.subscribe((data: any) => {
  //   console.log(data)
  // });

  return (
    <ConfigProvider
      theme={{
        ...themeValue,
        token: {
          ...themeValue?.token,
          colorError: '#FF0000',
          borderRadius: 12,
          colorBgMask: 'rgba(0,0,0,0.8)',
          colorPrimary: '#4f39f6'
        },
      }}
      getPopupContainer={getPopupContainer}
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <IntlProvider locale={'zh-CN'} defaultLocale={'zh-CN'}>
            <Suspense
              fallback={
                <Spin className={styles.Loading} tip="加载中...">
                  {/* 这个 span 不能删,会影响布局 */}
                  <span />
                </Spin>
              }
            >
              <RouterProvider router={router} />
            </Suspense>
          </IntlProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ConfigProvider>
  );
};

export default App;
