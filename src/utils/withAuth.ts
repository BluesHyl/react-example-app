import { useEffect, useState, type ComponentType, createElement } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { useUserStore } from "@/store/user";

interface WithAuthOptions {
  /**
   * 未登录时重定向的路径
   * @default "/login"
   */
  redirectTo?: string;
  
  /**
   * 是否在登录后重定向回原始路径
   * @default true
   */
  rememberPath?: boolean;
  
  /**
   * 自定义权限检查逻辑
   * @param user 当前用户信息
   * @returns 是否有权限访问
   */
  checkAuth?: (user: any) => boolean;
}

/**
 * 权限控制高阶组件
 * @param Component 需要保护的组件
 * @param options 配置选项
 * @returns 包装后的组件
 */
const withAuth = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) => {
  const {
    redirectTo = "/login",
    rememberPath = true,
    checkAuth = (user) => !!user,
  } = options;
  
  // 使用有意义的名称
  const WithAuthComponent = (props: P) => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    
    useEffect(() => {
      // 检查用户是否有权限
      const hasAuth = checkAuth(user);
      console.log("用户权限检查结果:", hasAuth);
      setIsAuthorized(hasAuth);
      
      // 如果没有权限，重定向到登录页面
      if (!hasAuth) {
        const redirectPath = redirectTo + 
          (rememberPath ? `?from=${encodeURIComponent(location.pathname + location.search)}` : "");
        
        navigate(redirectPath, {state: location.pathname, replace: true });
      }
    }, [user, navigate, location.pathname, location.search]);
    
    // 在权限检查完成前不渲染任何内容
    if (isAuthorized === null) {
      return null;
    }
    
    // 如果有权限，渲染组件
    return isAuthorized ? createElement(Component, props) : null;
  };
  
  // 设置有意义的显示名称，方便调试
  WithAuthComponent.displayName = `WithAuth(${Component?.displayName || Component?.name || "Component"})`;
  
  return WithAuthComponent;
};

export default withAuth;