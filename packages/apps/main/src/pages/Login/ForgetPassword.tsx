import React, { useState } from 'react';
import { Form, Input, Button, message, Steps } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Step } = Steps;

interface EmailFormValues {
  email: string;
}

interface ResetFormValues {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (values: EmailFormValues) => {
    try {
      // TODO: 发送验证码到邮箱
      setEmail(values.email);
      message.success('验证码已发送到您的邮箱');
      setCurrentStep(1);
    } catch (error) {
      message.error('发送验证码失败，请重试');
    }
  };

  const handleResetSubmit = async (values: ResetFormValues) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        message.error('两次输入的密码不一致');
        return;
      }
      // TODO: 验证码验证和密码重置逻辑
      message.success('密码重置成功！');
      navigate('/login');
    } catch (error) {
      message.error('密码重置失败，请重试');
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <h1>找回密码</h1>
          <p>我们将帮助您重置密码</p>
        </Header>

        <Steps current={currentStep} className="mb-8">
          <Step title="验证邮箱" />
          <Step title="重置密码" />
        </Steps>

        {currentStep === 0 ? (
          <Form name="emailForm" onFinish={handleEmailSubmit} style={{marginTop: '24px'}}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="请输入您的邮箱" 
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                发送验证码
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form name="resetForm" onFinish={handleResetSubmit} style={{marginTop: '24px'}}>
            <Form.Item
              name="code"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input 
                placeholder="请输入验证码" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码长度不能小于6位' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="请输入新密码" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: '请确认新密码' },
                { min: 6, message: '密码长度不能小于6位' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="请确认新密码" 
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                重置密码
              </Button>
            </Form.Item>
          </Form>
        )}

        <BackToLogin>
          <a onClick={() => navigate('/login')}>返回登录</a>
        </BackToLogin>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 24px;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    color: #666;
  }
`;

const BackToLogin = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export default ForgotPasswordPage;