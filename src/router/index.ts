import React from 'react';
import { Navigate } from 'react-router';
import MainLayout from '@/layout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import User from '@/pages/User';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/404';

// 静态路由配置
export const staticRoutes = [
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: 'home',
        Component: Home,
        meta: {
          requiresAuth: true,
          title: '首页',
        },
      },
      {
        path: 'user',
        Component: User,
        meta: {
          requiresAuth: true,
          title: '用户管理',
        },
      },
      {
        path: 'settings',
        Component: Settings,
        meta: {
          requiresAuth: true,
          title: '系统设置',
        },
      }
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
];

// 异步路由配置（可以根据用户角色动态加载）
export const asyncRoutes = [
  // 这里可以添加需要根据权限动态加载的路由
  // 例如：
  // {
  //   path: '/admin',
  //   Component: <Admin />,
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['admin'],
  //     title: '管理员页面',
  //   },
  // },
];

// 根据用户角色过滤路由
export const filterAsyncRoutes = (routes: any[], roles: string[]) => {
  const res: any[] = [];

  routes.forEach(route => {
    const tmp = { ...route };
    
    // 检查用户是否有权限访问该路由
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
};

// 检查用户是否有权限
const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  }
  
  // 如果路由没有设置roles，则所有人都可以访问
  return true;
};

export default staticRoutes;