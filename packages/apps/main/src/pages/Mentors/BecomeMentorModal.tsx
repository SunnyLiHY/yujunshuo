import React from 'react';
import { Modal, Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface BecomeMentorModalProps {
  open: boolean;
  onClose: () => void;
}

interface MentorFormData {
  name: string;
  title: string;
  company: string;
  industry: string;
  hourlyRate: number;
  introduction: string;
  skills: string[];
  avatar?: File;
}

const { TextArea } = Input;
const { Option } = Select;

export const BecomeMentorModal: React.FC<BecomeMentorModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<MentorFormData>();

  const handleSubmit = async() => {
    try {
      // 这里添加提交逻辑
      const values = await form.validateFields();
      // onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

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

  return (
    <Modal
      title="成为引导者"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      width={800}
      okText="发布需求"
      cancelText="取消"
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="avatar" label="头像">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>上传头像</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入您的真实姓名" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="position" label="职位" rules={[{ required: true, message: '请选择职位' }]}>
            <Select placeholder="请选择您当前的职位">
              <option value="developer">开发工程师</option>
              <option value="product">产品经理</option>
              <option value="design">设计师</option>
              <option value="marketing">市场营销</option>
              <option value="operation">运营</option>
              <option value="hr">人力资源</option>
              <option value="finance">财务</option>
              <option value="management">管理层</option>
              <option value="other">其他</option>
            </Select>
          </Form.Item>
          <Form.Item name="company" label="公司" rules={[{ required: true, message: '请选择公司类型' }]}>
            <Select placeholder="请选择您当前就职公司">
              <option value="bat">BAT</option>
              <option value="unicorn">独角兽</option>
              <option value="foreign">外企</option>
              <option value="state">国企</option>
              <option value="startup">创业公司</option>
              <option value="other">其他</option>
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

        <Form.Item name="skills" label="专业技能" rules={[{ required: true, message: '请选择专业技能' }]}>
          <Select mode="tags" placeholder="请输入您的专业技能">
            <Option value="product">产品规划</Option>
            <Option value="growth">用户增长</Option>
            <Option value="data">数据分析</Option>
            <Option value="design">产品设计</Option>
            <Option value="development">开发</Option>
          </Select>
        </Form.Item>
        <Form.Item name="introduction" label="个人介绍" rules={[{ required: true, message: '请输入个人介绍' }]}>
          <TextArea rows={4} placeholder="请简要介绍您的专业背景和经验" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
