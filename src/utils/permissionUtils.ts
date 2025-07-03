// 检查用户是否有权限
export const hasMenuPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  }
  
  // 如果路由没有设置roles，则所有人都可以访问
  return true;
}; 