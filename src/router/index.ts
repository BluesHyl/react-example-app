import React from 'react';
import { Navigate, useNavigate, redirect } from 'react-router';
import MainLayout from '@/layout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import User from '@/pages/User';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/404';
import Admin from '@/pages/Admin';
import Stock from '@/pages/Stock';
import { hasMenuPermission } from '@/utils/permissionUtils';

// 静态路由配置
export const staticRoutes = [
  {
    path: '/',
    loader: () => redirect('/login'),
    Component: null
  },
  {
    path: '/login',
    Component: Login,
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
          roles: ['admin', 'user'], // 角色权限示例
        },
      },
      {
        path: 'user',
        Component: User,
        meta: {
          requiresAuth: true,
          title: '用户管理',
          roles: ['admin', 'user'], // 角色权限示例
        },
      },
      {
        path: 'settings',
        Component: Settings,
        meta: {
          requiresAuth: true,
          title: '系统设置',
          roles: ['admin', 'user'], // 角色权限示例
        },
      },
       {
        path: 'stock',
        Component: Stock,
        meta: {
          requiresAuth: true,
          title: '库存管理',
          roles: ['admin', 'user'], // 角色权限示例
        },
      },
      {
        path: '/admin',
        Component: Admin,
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: '管理员页面',
        },
      },
    ],
  }
];

// 根据用户角色过滤路由
export const filterAsyncRoutes = (routes: any[], roles: string[]) => {
  const res: any[] = [];

  routes.forEach(route => {
    const tmp = { ...route };
    
    // 检查用户是否有权限访问该路由
    if (hasMenuPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
};



export default staticRoutes;