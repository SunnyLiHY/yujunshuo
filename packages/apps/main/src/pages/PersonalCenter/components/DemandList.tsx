import React from 'react';
import { Table, Button, Space, Modal, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DemandItem {
  id: string;
  title: string;
  category: string;
  status: string;
  createTime: string;
  budget: number;
}

const DemandList: React.FC = () => {
  // 示例数据
  const mockData: DemandItem[] = [
    {
      id: 'DEM20230001',
      title: '需要一位经验丰富的考研数学老师',
      category: '考研辅导',
      status: '已发布',
      createTime: '2023-06-01',
      budget: 200,
    },
    {
      id: 'DEM20230002',
      title: '找托福口语指导老师',
      category: '语言培训',
      status: '进行中',
      createTime: '2023-06-05',
      budget: 150,
    },
    {
      id: 'DEM20230003',
      title: '职业规划咨询',
      category: '职业发展',
      status: '已结束',
      createTime: '2023-06-10',
      budget: 300,
    },
  ];

  const handleEdit = (id: string) => {
    // 处理编辑逻辑
  };

  const handleOffline = (id: string) => {
    Modal.confirm({
      title: '确认下架',
      content: '确定要下架这个需求吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 处理下架逻辑
          message.success('下架成功');
        } catch (error) {
          message.error('操作失败');
        }
      },
    });
  };

  const columns: ColumnsType<DemandItem> = [
    {
      title: '需求标题',
      dataIndex: 'title',
      key: 'title',
      className: 'text-gray-900 font-medium',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已发布': 'green',
          '进行中': 'blue',
          '已结束': 'gray',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget: number) => (
        <span className="text-indigo-600 font-medium">¥{budget}/小时</span>
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            className="text-indigo-600 hover:text-indigo-800"
            onClick={() => handleEdit(record.id)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={() => handleOffline(record.id)}
          >
            下架
          </Button>
        </Space>
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

export default DemandList;