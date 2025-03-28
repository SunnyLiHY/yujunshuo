import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/home" className="text-2xl font-bold text-indigo-600">
                与君说
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link to="/home" className={isActiveLink('/') ? 'nav-link-active' : 'nav-link'}>
                首页
              </Link>
              <Link to="/mentors" className={isActiveLink('/mentors') ? 'nav-link-active' : 'nav-link'}>
                引导者展示
              </Link>
              <Link to="/demands" className={isActiveLink('/demands') ? 'nav-link-active' : 'nav-link'}>
                需求广场
              </Link>
              <Link to="/about" className={isActiveLink('/about') ? 'nav-link-active' : 'nav-link'}>
                关于我们
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/login" className="nav-link">
              登录
            </Link>
            <Link to="/register" className="btn-primary ml-3">
              注册
            </Link>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">打开主菜单</span>
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">
                首页
              </Link>
              <Link
                to="/mentors"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                寻找引导者
              </Link>
              <Link
                to="/mentors"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                浏览需求
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                关于我们
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50"
                >
                  注册
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
