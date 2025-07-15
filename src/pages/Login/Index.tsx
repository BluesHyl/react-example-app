import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Navigate  } from 'react-router';
import { useUserStore } from '../../store/user';
import * as API from '../../api/index';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserStore();
  // 如果用户已登录，直接重定向到首页
  if (user) {
    return <Navigate to="/home" replace />;
  }

  const onFinish = async (values: LoginForm) => {
    console.log(122)
    setLoading(true);
    try {
      const res = await API.login(values);
      console.log(res)
      setUser({
        ...res.user,
        token: res.access_token,
        roles: [res.user.role],
      });
      message.success('登录成功');
      const path = location.state || '/home';
      navigate(path);
    } catch (error: any) {
      message.error(error.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">后台管理系统</h1>
          <p className="text-gray-500 mt-2">欢迎使用后台管理系统</p>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          initialValues={{
            email: 'admin',
            password: 'admin123',
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="密码" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full"
              loading={loading}
            >
              登录
              </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    )
  }
export default Login;