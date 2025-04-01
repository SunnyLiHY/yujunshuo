import React, { useState } from 'react';
import { Form, Input, Select, Button, message, Space } from 'antd';

const UserInfo: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  // 示例数据
  const mockUserData = {
    email: 'example@email.com',
    name: '张三',
    nickname: '小张',
    phone: '13800138000',
    ageRange: '26-35',
  };

  React.useEffect(() => {
    form.setFieldsValue(mockUserData);
  }, [form]);

  const handleSubmit = async (values: any) => {
    try {
      // 处理保存逻辑
      console.log('保存的数据:', values);
      message.success('保存成功');
      setEditing(false);
    } catch (error) {
      message.error('保存失败');
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={!editing}
        className="space-y-4"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
          ]}
        >
          <Input className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="年龄段"
          name="ageRange"
          rules={[{ required: true, message: '请选择年龄段' }]}
        >
          <Select className="rounded-md">
            <Select.Option value="18-25">18-25岁</Select.Option>
            <Select.Option value="26-35">26-35岁</Select.Option>
            <Select.Option value="36-45">36-45岁</Select.Option>
            <Select.Option value="46-55">46-55岁</Select.Option>
            <Select.Option value="56+">56岁以上</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          {editing ? (
            <Space>
              <Button 
                type="primary" 
                htmlType="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                保存
              </Button>
              <Button onClick={() => setEditing(false)}>
                取消
              </Button>
            </Space>
          ) : (
            <Button 
              type="primary" 
              onClick={() => setEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              编辑
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserInfo;