import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUserStore } from '@/store/user';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  console.log('AuthGuard渲染了');
  const location = useLocation();
  const { user } = useUserStore();

  // 检查是否是登录页面
  const isLoginPage = location.pathname === '/login';

  // 如果用户未登录且不是登录页面，重定向到登录页面
  if (!user && !isLoginPage) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用户已登录且访问登录页面，重定向到首页
  if (user && isLoginPage) {
    return <Navigate to="/home" replace />;
  }

  // 如果用户已登录且访问其他页面，或者未登录但访问登录页面，正常渲染
  return <>{children}</>;
};

export default AuthGuard;