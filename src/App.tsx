import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import routes from './router';
import withAuth from '@/utils/withAuth'
// 创建路由配置
const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    element: withAuth(route.element),
  })),
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