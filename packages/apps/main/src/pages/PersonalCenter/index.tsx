import React from 'react';
import { Tabs } from 'antd';
import OrderList from './components/OrderList';
import DemandList from './components/DemandList';
import UserInfo from './components/UserInfo';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">个人主页</h1>
      <Tabs 
        defaultActiveKey="1"
        className="bg-white rounded-lg shadow-sm p-6"
        items={[
          {
            key: '1',
            label: '订单列表',
            children: <OrderList />,
          },
          {
            key: '2',
            label: '需求列表',
            children: <DemandList />,
          },
          {
            key: '3',
            label: '个人信息',
            children: <UserInfo />,
          },
        ]}
      />
    </div>
  );
};

export default Profile;