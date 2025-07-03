import React from 'react';
import { RouterProvider, createBrowserRouter, BrowserRouter } from 'react-router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
// import routes from './router';
import RouterGuard from '@/router/RouterGuard';
// 创建路由配置
// const router = createBrowserRouter(
//   routes.map(route => ({
//     ...route,
//     element: route.element,
//   }))
// );

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
      <BrowserRouter>
        <RouterGuard />
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </ConfigProvider>
  );
};

export default App;