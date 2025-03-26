import React from 'react';
import { Modal, Form, Input, Select, InputNumber, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { NewDemand } from '../../types';

const { TextArea } = Input;
const { Option } = Select;

interface PublishDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (demand: NewDemand) => void;
  confirmLoading?: boolean;
}

export const PublishDemandModal: React.FC<PublishDemandModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  confirmLoading = false
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="发布需求"
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      okText="发布需求"
      cancelText="取消"
      width={800}
      maskClosable={false}
      destroyOnClose
      className="demand-modal"
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark
        initialValues={{
          position: undefined,
          priceRange: undefined,
          estimatedHours: undefined
        }}
      >
        {/* 需求标题 */}
        <Form.Item
          name="title"
          label="需求标题"
          rules={[
            { required: true, message: '请输入需求标题' },
            { max: 50, message: '标题最多50个字符' }
          ]}
        >
          <Input 
            placeholder="例如：寻找产品经理指导职业规划和简历优化" 
            maxLength={50}
            showCount
          />
        </Form.Item>

        {/* 需求描述 */}
        <Form.Item
          name="description"
          label="需求描述"
          rules={[
            { required: true, message: '请输入需求描述' },
            { min: 50, message: '描述至少50个字符' },
            { max: 1000, message: '描述最多1000个字符' }
          ]}
        >
          <TextArea
            placeholder={`请详细描述您的需求，建议包含以下内容：
1. 您的背景和目标
2. 希望得到哪些方面的帮助
3. 是否有特殊要求或偏好
4. 期望达成的具体目标`}
            rows={6}
            maxLength={1000}
            showCount
          />
        </Form.Item>

        {/* 职位方向和预算区间 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="position"
            label="职位方向"
            rules={[{ required: true, message: '请选择职位方向' }]}
          >
            <Select placeholder="请选择职位方向">
              <Option value="developer">开发工程师</Option>
              <Option value="product">产品经理</Option>
              <Option value="design">设计师</Option>
              <Option value="marketing">市场营销</Option>
              <Option value="operation">运营</Option>
              <Option value="hr">人力资源</Option>
              <Option value="finance">财务</Option>
              <Option value="management">管理层</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priceRange"
            label="预算区间"
            rules={[{ required: true, message: '请选择预算区间' }]}
          >
            <Select placeholder="请选择预算区间">
              <Option value="0-100">0-100元/小时</Option>
              <Option value="100-200">100-200元/小时</Option>
              <Option value="200-300">200-300元/小时</Option>
              <Option value="300+">300元以上/小时</Option>
            </Select>
          </Form.Item>
        </div>

        {/* 预计时长和标签 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="estimatedHours"
            label="预计时长"
            rules={[{ required: true, message: '请选择预计时长' }]}
          >
            <Select placeholder="请选择预计时长">
              <Option value="1">1小时</Option>
              <Option value="1-2">1-2小时</Option>
              <Option value="2-3">2-3小时</Option>
              <Option value="3+">3小时以上</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="相关标签"
            tooltip="最多可以选择3个标签"
          >
            <Select
              mode="tags"
              placeholder="请输入或选择标签"
              maxTagCount={3}
              maxTagTextLength={10}
            >
              <Option value="职业规划">职业规划</Option>
              <Option value="简历优化">简历优化</Option>
              <Option value="面试技巧">面试技巧</Option>
              <Option value="职业转型">职业转型</Option>
              <Option value="能力提升">能力提升</Option>
            </Select>
          </Form.Item>
        </div>

        {/* 提示信息 */}
        <Alert
          message={
            <div className="flex items-center">
              <InfoCircleOutlined className="mr-2" />
              <span className="font-medium">温馨提示</span>
            </div>
          }
          description={
            <ul className="list-disc pl-5 mt-2">
              <li>请确保您提供的信息准确完整</li>
              <li>发布后的需求可以在个人中心查看和管理</li>
              <li>如有疑问请联系客服</li>
            </ul>
          }
          type="info"
          showIcon={false}
          className="mt-4"
        />
      </Form>
    </Modal>
  );
};