import React, { useEffect, useState } from 'react';
import { useRoutes, Navigate } from 'react-router';
import { Spin } from 'antd';
import { useUserStore } from '@/store/user';
import { staticRoutes, asyncRoutes, filterAsyncRoutes } from './index';
import { useNavigate } from 'react-router';

// 模拟从后端获取路由配置
const fetchRoutes = (roles: string[]): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('asyncRoutes', asyncRoutes);
      // 根据角色过滤路由
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      resolve(accessedRoutes);
    }, 1000);
  });
};

// 将路由配置转换为React Router可用的格式
const transformRoutes = (routes: any[]) => {
  return routes.map(route => {
    const Component = route.Component;
    
    const newRoute: any = {
      path: route.path,
      element: route.meta?.requiresAuth ? (
        <AuthRoute>
          <Component />
        </AuthRoute>
      ) : <Component />
    };
    
    if (route.children) {
      newRoute.children = transformRoutes(route.children);
    }
    
    return newRoute;
  });
};

// 路由守卫组件
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// 路由加载器组件
const RouterGuard: React.FC = () => {
  const { user } = useUserStore();
  const [routes, setRoutes] = useState<any[]>(staticRoutes);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoutes = async () => {
      if (user && user.roles) {
        // 用户已登录，如果访问的是根路径，重定向到主页
        if (location.pathname === '/') {
          navigate('/home');
          return;
        }
        
        setLoading(true);
        try {
          // 获取动态路由
          const asyncRoutesList = await fetchRoutes(user.roles);
          
          // 合并静态路由和动态路由
          const allRoutes = transformRoutes([...staticRoutes, ...asyncRoutesList]);
          
          // 找到布局路由
          const layoutRoute = allRoutes.find(route => route.path === '/');
          
          if (layoutRoute && layoutRoute.children) {
            // 将动态路由添加到布局路由的子路由中
            asyncRoutesList.forEach(route => {
              layoutRoute.children.push({
                path: route.path.replace('/', ''),
                element: route.element,
              });
            });
          }
          
          setRoutes(allRoutes);
        } catch (error) {
          console.error('加载路由失败:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadRoutes();
  }, [user]);

  const routeElements = useRoutes(routes);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="加载路由中..." />
      </div>
    );
  }

   // 如果用户未登录且不在登录页面，则重定向到登录页
   if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return <>{routeElements}</>;
};

export default RouterGuard;