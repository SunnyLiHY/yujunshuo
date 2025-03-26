import React from 'react';
import { Modal, Form, Input, InputNumber, Select, TimePicker, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ApplyOrder } from '../../types';
import type { Dayjs } from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface ApplyOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplyOrder) => void;
  confirmLoading?: boolean;
  demandId: string;
  demandTitle: string;
}

export const ApplyOrderModal: React.FC<ApplyOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  confirmLoading = false,
  demandId,
  demandTitle
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        demandId
      });
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
      title="申请接单"
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      okText="提交申请"
      cancelText="取消"
      width={720}
      maskClosable={false}
      destroyOnClose
      className="apply-order-modal"
    >
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-gray-600 font-medium">需求标题</h3>
        <p className="text-gray-900 mt-1">{demandTitle}</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark
        initialValues={{
          communicationMethod: undefined,
        }}
      >
        {/* 自我介绍 */}
        <Form.Item
          name="introduction"
          label="自我介绍"
          rules={[
            { required: true, message: '请输入自我介绍' },
            { min: 50, message: '介绍至少50个字符' },
            { max: 500, message: '介绍最多500个字符' }
          ]}
          tooltip="介绍您的专业背景、工作经验和能力优势"
        >
          <TextArea
            placeholder={`请详细介绍您的背景和优势，建议包含：
1. 您的教育背景和专业领域
2. 相关工作经验和成就
3. 能为求助者提供哪些具体帮助
4. 您的指导方式和特色`}
            rows={6}
            maxLength={500}
            showCount
          />
        </Form.Item>

        {/* 报价和可用时间 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="price"
            label="咨询报价"
            rules={[
              { required: true, message: '请输入报价' },
              { type: 'number', min: 0, message: '报价必须大于0' }
            ]}
            tooltip="请输入每小时的咨询报价（元）"
          >
            <InputNumber
              placeholder="请输入报价"
              style={{ width: '100%' }}
              addonAfter="元/小时"
              min={0}
              max={9999}
            />
          </Form.Item>

          <Form.Item
            name="availableTime"
            label="可用时间"
            rules={[{ required: true, message: '请选择可用时间' }]}
            tooltip="请选择您可以进行咨询的时间段"
          >
            <Select
              mode="multiple"
              placeholder="请选择可用时间"
              maxTagCount={3}
              options={[
                { label: '工作日白天', value: 'weekday-day' },
                { label: '工作日晚上', value: 'weekday-night' },
                { label: '周末白天', value: 'weekend-day' },
                { label: '周末晚上', value: 'weekend-night' }
              ]}
            />
          </Form.Item>
        </div>

        {/* 沟通方式和联系方式 */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="communicationMethod"
            label="沟通方式"
            rules={[{ required: true, message: '请选择沟通方式' }]}
          >
            <Select placeholder="请选择沟通方式">
              <Option value="video">视频会议</Option>
              <Option value="voice">语音通话</Option>
              <Option value="text">文字交流</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="contactInfo"
            label="联系方式"
            rules={[
              { required: true, message: '请输入联系方式' },
              { type: 'string', min: 5, message: '请输入正确的联系方式' }
            ]}
            tooltip="请输入您的微信号或手机号"
          >
            <Input placeholder="请输入微信号或手机号" />
          </Form.Item>
        </div>

        {/* 提示信息 */}
        <Alert
          message={
            <div className="flex items-center">
              <InfoCircleOutlined className="mr-2" />
              <span className="font-medium">接单提示</span>
            </div>
          }
          description={
            <ul className="list-disc pl-5 mt-2">
              <li>请如实填写您的个人信息和专业背景</li>
              <li>系统会根据您的报价向求助者收取10%的服务费</li>
              <li>接单后请及时与求助者沟通确认具体咨询时间</li>
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