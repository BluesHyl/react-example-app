import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/store/user';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  // 模拟登录请求
  const mockLogin = async (data: LoginForm): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟服务器响应
        if (data.username === 'admin' && data.password === 'admin123') {
          resolve({
            id: '1',
            username: 'admin',
            roles: ['admin'],
            token: 'mock-token-' + Date.now(),
          });
        } else {
          throw new Error('用户名或密码错误');
        }
      }, 1000);
    });
  };

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const user = await mockLogin(values);
      setUser(user);
      message.success('登录成功');
      navigate('/home');
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
            username: 'admin',
            password: 'admin123',
          }}
        >
          <Form.Item
            name="username"
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