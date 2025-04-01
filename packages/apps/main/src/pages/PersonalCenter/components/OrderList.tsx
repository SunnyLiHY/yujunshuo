import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface OrderItem {
  id: string;
  serviceName: string;
  mentorName: string;
  date: string;
  timeSlot: string;
  status: string;
  price: number;
}

const OrderList: React.FC = () => {
  // 示例数据
  const mockData: OrderItem[] = [
    {
      id: 'ORD20230001',
      serviceName: '职业规划咨询',
      mentorName: '张教授',
      date: '2023-06-15',
      timeSlot: '14:00-15:00',
      status: '已完成',
      price: 299,
    },
    {
      id: 'ORD20230002',
      serviceName: '留学申请指导',
      mentorName: '李博士',
      date: '2023-06-20',
      timeSlot: '10:00-11:00',
      status: '待进行',
      price: 399,
    },
    {
      id: 'ORD20230003',
      serviceName: '考研规划',
      mentorName: '王老师',
      date: '2023-06-25',
      timeSlot: '16:00-17:00',
      status: '已取消',
      price: 199,
    },
  ];

  const columns: ColumnsType<OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      className: 'text-gray-600',
    },
    {
      title: '咨询项目',
      dataIndex: 'serviceName',
      key: 'serviceName',
      className: 'text-gray-900 font-medium',
    },
    {
      title: '咨询师',
      dataIndex: 'mentorName',
      key: 'mentorName',
    },
    {
      title: '预约日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '时间段',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已完成': 'green',
          '待进行': 'blue',
          '已取消': 'gray',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '费用',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="text-indigo-600 font-medium">¥{price}</span>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={mockData} 
      rowKey="id"
      pagination={{ pageSize: 10 }}
      className="bg-white rounded-lg"
    />
  );
};

export default OrderList;