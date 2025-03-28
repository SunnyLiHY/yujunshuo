import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeibo, faWeixin, faQq } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">与君说</h3>
            <p className="text-gray-400">连接求学者与引导者的桥梁，助力职业规划与发展。</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faWeixin} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faWeibo} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faQq} className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-gray-400 hover:text-white">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="text-gray-400 hover:text-white">
                  引导者展示
                </Link>
              </li>
              <li>
                <Link to="/demands" className="text-gray-400 hover:text-white">
                  需求广场
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">帮助中心</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  使用指南
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  用户协议
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  隐私政策
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <i className="fas fa-envelope mr-2"></i> contact@yujunshuo.com
              </li>
              <li>
                <i className="fas fa-phone mr-2"></i> 400-123-4567
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i> 北京市海淀区中关村大街1号
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2023 与君说. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Navbar;
