import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import routes from './router';
import AuthGuard from './components/AuthGuard';

// 创建路由配置
const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    element: <AuthGuard>{route.element}</AuthGuard>,
  }))
);

const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;