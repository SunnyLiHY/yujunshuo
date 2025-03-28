import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox, Row, Col, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface RegisterFormValues {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  agreement: boolean;
}

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    try {
      // 验证邮箱
      await form.validateFields(['email']);
      const email = form.getFieldValue('email');

      // TODO: 调用发送验证码接口
      message.success(`验证码已发送至邮箱: ${email}`);
      startCountdown();
    } catch (error) {
      message.error('请输入有效的邮箱地址');
    }
  };

  const onFinish = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      // TODO: 实现注册逻辑
      console.log('注册表单数据:', values);
      message.success('注册成功！');
      navigate('/login');
    } catch (error) {
      message.error('注册失败，请重试！');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <h1>创建账号</h1>
          <p>请填写以下信息完成注册</p>
        </RegisterHeader>

        <Form form={form} name="register" onFinish={onFinish} scrollToFirstError size="large">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="手机号" />
          </Form.Item>
          <Form.Item name="ageRange" rules={[{ required: true, message: '请选择年龄段' }]}>
            <Select
              placeholder="请选择年龄段"
              options={[
                { label: '80后', value: '80' },
                { label: '90后', value: '90' },
                { label: '95后', value: '95' },
                { label: '00后', value: '00' },
                { label: '05后', value: '05' },
                { label: '10后', value: '10' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item name="nikename">
            <Input prefix={<UserOutlined />} placeholder="昵称" />
          </Form.Item>
          {/* <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item
                  name="verificationCode"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input placeholder="验证码" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button 
                  block 
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item> */}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议')),
              },
            ]}
          >
            <Checkbox>
              我已阅读并同意 <a href="/terms">用户协议</a> 和 <a href="/privacy">隐私政策</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              注册
            </Button>
          </Form.Item>

          <LoginLink>
            已有账号？<a onClick={() => navigate('/login')}>立即登录</a>
          </LoginLink>
        </Form>
      </RegisterCard>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 24px;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
`;

const RegisterHeader = styled.div`
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

const LoginLink = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export default RegisterPage;
