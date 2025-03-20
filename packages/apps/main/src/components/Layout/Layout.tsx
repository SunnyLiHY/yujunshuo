import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
/**
 * 页面的框架，顶层组件，包含顶部导航和侧边栏
 * @returns
 */
export const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  );
};
