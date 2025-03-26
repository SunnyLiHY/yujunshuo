import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWeixin as fabWeixin } from '@fortawesome/free-brands-svg-icons';

interface ContactItem {
  icon: typeof faMapMarkerAlt;
  title: string;
  content: string;
  link?: string;
}

const ContactInfo: React.FC = () => {
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const contactItems: ContactItem[] = [
    {
      icon: faEnvelope,
      title: '邮箱',
      content: 'contact@yujunshuo.com',
      link: 'mailto:contact@yujunshuo.com',
    },
    {
      icon: faPhone,
      title: '电话',
      content: '400-123-4567',
      link: 'tel:4001234567',
    },
    {
      icon: faMapMarkerAlt,
      title: '地址',
      content: '北京市海淀区中关村大街1号',
    },
    // {
    //   icon: fabWeixin,
    //   title: '微信公众号',
    //   content: '与君说官方',
    // },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">联系方式</h3>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-3 rounded-lg transition duration-300 hover:bg-gray-50"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition duration-300 hover:bg-indigo-200 hover:scale-110">
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{item.title}</h4>
              {item.link ? (
                <a href={item.link} className="text-base text-gray-900 hover:text-indigo-600 transition duration-300">
                  {item.content}
                </a>
              ) : (
                <p className="text-base text-gray-900">{item.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 二维码部分 - 添加点击展示大图功能 */}
      {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src="/qrcode.png"
              alt="微信公众号二维码"
              className="w-32 h-32 mx-auto mb-2 cursor-pointer transition duration-300 hover:shadow-lg"
              onClick={() => setIsQRCodeVisible(true)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/default-qr.png';
              }}
            />
            <p className="text-sm text-gray-600">点击查看大图</p>
          </div>
        </div>
      </div> */}

      {/* 二维码弹窗 */}
      {isQRCodeVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsQRCodeVisible(false)}
        >
          <div className="bg-white p-4 rounded-lg max-w-sm w-full mx-4">
            <img src="/qrcode.png" alt="微信公众号二维码" className="w-full h-auto" />
            <p className="text-center mt-4 text-gray-600">点击任意位置关闭</p>
          </div>
        </div>
      )}

      {/* 工作时间 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-500 mb-2">工作时间</h4>
        <p className="text-base text-gray-900">周一至周日: 9:00 - 19:00</p>
        <p className="text-sm text-gray-500 mt-1">节假日请参考具体通知</p>
      </div>

      {/* 快速响应承诺 */}
      {/* <div className="text-center text-sm text-gray-500 mt-6">
        <p>我们承诺在24小时内回复您的咨询</p>
      </div> */}
    </div>
  );
};

export default ContactInfo;
