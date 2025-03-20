import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="开发中"
      subTitle="REACT18前端脚手架！"
      extra={<Button type="primary" onClick={() => navigate(`/index`)}>回到首页</Button>}
    />
  );
};
