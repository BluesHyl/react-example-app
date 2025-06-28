import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/store/user';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面。"
      extra={[
        <Button type="primary" key="home" onClick={() => navigate('/home')}>
          返回首页
        </Button>,
        user ? null : (
          <Button key="login" onClick={() => navigate('/login')}>
            去登录
          </Button>
        ),
      ].filter(Boolean)}
    />
  );
};

export default Forbidden;