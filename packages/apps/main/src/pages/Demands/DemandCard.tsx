import React, { useState } from 'react';
import { ApplyOrder, Demand } from '../../types';
import { message } from 'antd';
import { ApplyOrderModal } from './ApplyOrderModal';

interface DemandCardProps {
  demand: Demand;
}

export const DemandCard: React.FC<DemandCardProps> = ({ demand }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'progress':
        return 'status-progress';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleApplyOrder = async (data: ApplyOrder) => {
    setConfirmLoading(true);
    try {
      // 这里添加申请接单的API调用
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟API调用
      message.success('申请提交成功！');
      setIsModalOpen(false);
    } catch (error) {
      message.error('申请提交失败，请重试！');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <div className="card p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-bold text-gray-900">{demand.title}</h3>
              <span className={`ml-3 demand-status ${getStatusClass(demand.status)}`}>
                {demand.status === 'open' ? '待接单' : demand.status === 'progress' ? '进行中' : '已完成'}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{demand.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {demand.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">{demand.priceRange}</p>
            <p className="text-sm text-gray-500">{demand.estimatedHours}</p>
            <p className="text-sm text-gray-500 mt-1">发布时间：{demand.publishDate}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <img className="h-8 w-8 rounded-full" src={demand.user.avatar} alt="" />
            <span className="ml-2 text-sm text-gray-600">
              {demand.user.name} · {demand.user.school}
            </span>
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)} disabled={demand.status !== 'open'}>
            {demand.status === 'open' ? '申请接单' : '已结束'}
          </button>
        </div>
      </div>
      <ApplyOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplyOrder}
        confirmLoading={confirmLoading}
        demandId={demand.id}
        demandTitle={demand.title}
      />
    </>
  );
};
