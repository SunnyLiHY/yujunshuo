import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faComments, faShieldAlt, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <>
      {/* 英雄区域 */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="职业规划"
          />
          <div className="absolute inset-0 bg-indigo-800 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 md:py-32 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            与君说，共话未来
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-indigo-100 max-w-3xl">
            连接在职学长学姐与在校学生，提供个性化的职业规划指导和经验分享。
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register?role=seeker" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 text-center">
              我是求学者
            </Link>
            <Link
              to="/register?role=mentor"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-6 sm:px-8 rounded text-base sm:text-lg text-center"
            >
              我是引导者
            </Link>
          </div>
        </div>
      </div>
      {/* 平台优势部分 */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">平台优势</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              为什么选择与君说？
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              我们致力于为大学生提供最真实、最有价值的职业规划指导。
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="space-y-8 sm:space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FontAwesomeIcon icon={faUserTie} />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">真实职场人士</h3>
                <p className="mt-2 text-base text-gray-500">
                  所有引导者均为经过认证的在职人士，提供真实可靠的职场信息。
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FontAwesomeIcon icon={faComments} />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">一对一深度交流</h3>
                <p className="mt-2 text-base text-gray-500">通过视频、语音或文字，与引导者进行深度的一对一交流。</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">安全保障</h3>
                <p className="mt-2 text-base text-gray-500">严格的身份认证和评价机制，保障每次交流的质量和安全。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 热门引导者 --> */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">优秀引导者</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              来自各行各业的职场精英
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
            {/* <!-- 评价卡片 1 --> */}
            <div className="card p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/17.jpg"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">陈小雨</h4>
                  <p className="text-sm text-gray-500">北京大学 | 大四学生</p>
                  <div className="mt-1 flex items-center">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  </div>
                  <p className="mt-3 text-gray-600">
                    通过与张明老师的交流，我对产品经理这个职位有了更清晰的认识，他分享的求职技巧对我帮助很大，非常感谢！
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- 评价卡片 2 --> */}
            <div className="card p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="https://randomuser.me/api/portraits/men/43.jpg" alt="" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">刘阳</h4>
                  <p className="text-sm text-gray-500">复旦大学 | 研究生</p>
                  <div className="mt-1 flex items-center">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  </div>
                  <p className="mt-3 text-gray-600">
                    李婷老师在AI领域的专业知识令人印象深刻，她给我提供了很多实用的建议，让我对未来的职业规划更有信心。
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- 评价卡片 3 --> */}
            <div className="card p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://randomuser.me/api/portraits/women/28.jpg"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">张妈妈</h4>
                  <p className="text-sm text-gray-500">学生家长</p>
                  <div className="mt-1 flex items-center">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
                  </div>
                  <p className="mt-3 text-gray-600">
                    作为家长，我很担心孩子的就业问题。通过与王强老师的交流，我了解到了财会行业的发展前景，对孩子的职业选择有了更好的指导。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 如何使用 --> */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">使用指南</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              三步开启职业规划之旅
            </p>
          </div>

          <div className="relative">
            {/* <!-- 步骤线 --> */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>

            {/* <!-- 步骤1 --> */}
            <div className="relative md:flex md:items-center mb-12">
              <div className="md:w-1/2 md:pr-8 md:text-right">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900">1. 注册账号</h3>
                  <p className="mt-2 text-gray-600">选择您的身份（求学者/引导者），完成注册并填写个人信息。</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 flex md:justify-start justify-center">
                <div className="h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold z-10">
                  1
                </div>
              </div>
            </div>

            {/* <!-- 步骤2 --> */}
            <div className="relative md:flex md:items-center mb-12">
              <div className="md:w-1/2 md:pl-8 order-2">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900">2. 寻找合适的引导者</h3>
                  <p className="mt-2 text-gray-600">浏览引导者列表，根据行业、职位等筛选，找到最适合您的引导者。</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pr-8 mt-4 md:mt-0 flex md:justify-end justify-center order-1">
                <div className="h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold z-10">
                  2
                </div>
              </div>
            </div>

            {/* <!-- 步骤3 --> */}
            <div className="relative md:flex md:items-center">
              <div className="md:w-1/2 md:pr-8 md:text-right">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900">3. 预约并进行约聊</h3>
                  <p className="mt-2 text-gray-600">选择合适的时间，支付费用，通过视频/语音与引导者深入交流。</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 flex md:justify-start justify-center">
                <div className="h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold z-10">
                  3
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/register?role=seeker" className="btn-primary inline-block px-8 py-3 text-lg">
            立即开始
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
