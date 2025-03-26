import React from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, WechatOutlined, QqOutlined, WeiboOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    try {
      // TODO: 实现登录逻辑
      console.log('登录表单数据:', values);
      message.success('登录成功！');
      navigate('/');
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <h1>欢迎回来</h1>
          <p>请登录您的账号</p>
        </LoginHeader>

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className={'nav-link-active'}>
                忘记密码?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>

          {/* <Divider plain>或</Divider>

          <ThirdPartyLogin>
            <Button icon={<WechatOutlined />}>微信</Button>
            <Button icon={<QqOutlined />}>QQ</Button>
            <Button icon={<WeiboOutlined />}>微博</Button>
          </ThirdPartyLogin> */}

          <RegisterLink>
            还没有账号?{' '}
            <Link to="/register" className={'nav-link-active'}>
              立即注册
            </Link>
            {/* <a href="/register">立即注册</a> */}
          </RegisterLink>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 24px;
`;

const LoginCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
`;

const LoginHeader = styled.div`
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

const ThirdPartyLogin = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export default LoginPage;
