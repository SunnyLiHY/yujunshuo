import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload, message, TimePicker, DatePicker, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import dayjs from 'dayjs';
import { TimeSlotSelector, type TimeSlot } from './TimeSlotSelector';

interface BecomeMentorModalProps {
  open: boolean;
  onClose: () => void;
}

interface MentorFormData {
  // 第一步：认证信息
  university: string;
  major: string;
  workplace: string;
  occupation: string;
  graduationCert?: File;
  workCert?: File;
  skills: string[];

  // 第二步：基本信息
  position: string;
  company: string;
  industry: string;
  hourlyRate: number;
}


const { TextArea } = Input;
const { Option } = Select;

export const BecomeMentorModal: React.FC<BecomeMentorModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<MentorFormData>();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const steps = [
    {
      title: '引导者认证',
      description: '需要管理员审核',
    },
    {
      title: '基本信息设置',
      description: '完善个人信息',
    },
  ];

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      return false;
    },
    maxCount: 1,
  };

  const renderStep1 = () => (
    <Form form={form} layout="vertical" autoComplete="off" style={{ marginTop: '12px' }}>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="university" label="毕业学校" rules={[{ required: true, message: '请输入毕业学校' }]}>
          <Input placeholder="请输入您的毕业学校" />
        </Form.Item>
        <Form.Item name="major" label="专业" rules={[{ required: true, message: '请输入专业' }]}>
          <Input placeholder="请输入您的专业" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="workplace" label="工作单位" rules={[{ required: true, message: '请输入工作单位' }]}>
          <Input placeholder="请输入您的工作单位" />
        </Form.Item>
        <Form.Item name="occupation" label="职业" rules={[{ required: true, message: '请输入职业' }]}>
          <Input placeholder="请输入您的职业" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="graduationCert" label="毕业证" rules={[{ required: true, message: '请上传毕业证' }]}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>上传毕业证</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="workCert" label="工作证" rules={[{ required: true, message: '请上传工作证' }]}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>上传工作证</Button>
          </Upload>
        </Form.Item>
      </div>
    </Form>
  );

  const renderStep2 = () => (
    <Form form={form} layout="vertical" autoComplete="off">
      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="position" label="职位" rules={[{ required: true, message: '请选择职位' }]}>
          <Select placeholder="请选择您当前的职位">
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
        <Form.Item name="company" label="公司" rules={[{ required: true, message: '请选择公司类型' }]}>
          <Select placeholder="请选择您当前就职公司">
            <Option value="bat">BAT</Option>
            <Option value="unicorn">独角兽</Option>
            <Option value="foreign">外企</Option>
            <Option value="state">国企</Option>
            <Option value="startup">创业公司</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="industry" label="所属行业" rules={[{ required: true, message: '请选择行业' }]}>
          <Select placeholder="请选择行业">
            <Option value="it">IT/互联网</Option>
            <Option value="finance">金融/财会</Option>
            <Option value="education">教育/培训</Option>
            <Option value="medical">医疗/健康</Option>
            <Option value="marketing">市场/营销</Option>
            <Option value="design">设计/创意</Option>
            <Option value="law">法律/咨询</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>
        <Form.Item name="hourlyRate" label="小时收费(元)" rules={[{ required: true, message: '请输入小时收费' }]}>
          <Input type="number" placeholder="请输入您的小时收费" />
        </Form.Item>
      </div>
      <Form.Item label="可约聊时间段" required>
        <TimeSlotSelector value={timeSlots} onChange={setTimeSlots} />
      </Form.Item>
    </Form>
  );

  const next = async () => {
    try {
      await form.validateFields();
      if (currentStep === 0) {
        // 提交认证信息到后台审核
        // TODO: 实现认证信息提交逻辑
        message.success('认证信息已提交，请等待管理员审核');
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    try {
      await form.validateFields();
      if (timeSlots.length === 0) {
        message.error('请至少添加一个可约聊时间段');
        return;
      }

      // 准备提交的数据
      const formData = {
        ...form.getFieldsValue(),
        availableTimes: timeSlots,
      };

      // TODO: 实现基本信息提交逻辑
      console.log('提交的数据：', formData);
      message.success('基本信息设置成功');
      onClose();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const renderContent = () => {
    return currentStep === 0 ? renderStep1() : renderStep2();
  };

  const renderFooter = () => {
    return (
      <div className="flex justify-end gap-4">
        {currentStep > 0 && <Button onClick={prev}>上一步</Button>}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            下一步
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleFinish}>
            完成
          </Button>
        )}
      </div>
    );
  };

  return (
    <Modal title="成为引导者" open={open} onCancel={onClose} footer={renderFooter()} width={800}>
      <Steps current={currentStep} items={steps} className="mb-8" />
      {renderContent()}
    </Modal>
  );
};