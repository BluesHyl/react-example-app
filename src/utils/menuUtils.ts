import { MenuProps } from 'antd';
import { hasMenuPermission } from '@/utils/permissionUtils';
import * as Icons from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

// 图标映射函数 - 可以根据路由配置中的iconName动态加载图标
// const getIcon = (iconName: string) => {
//   const Icon = (Icons as any)[iconName];
//   return Icon ? <Icon /> : null;
// };

// 将路由配置转换为菜单项
export const routesToMenuItems = (
  routes: any[], 
  parentPath: string = '', 
  roles: string[] = []
): MenuItem[] => {
  const menuItems: MenuItem[] = [];
  
  routes.forEach(route => {
    // 跳过登录页和404页面等不需要显示在菜单中的路由
    if (route.path === '/login' || route.path === '*' || !route.meta) {
      return;
    }
    
    // 检查权限
    if (route.meta?.roles && !hasMenuPermission(roles, route)) {
      return;
    }
    
    // 构建完整路径
    const fullPath = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`;
    
    const menuItem: MenuItem = {
      key: fullPath,
      label: route.meta?.title || route.path,
      icon: route.meta?.icon || null,
    };
    
    // 处理子路由
    if (route.children && route.children.length > 0) {
      const childrenItems = routesToMenuItems(route.children, fullPath, roles);
      if (childrenItems.length > 0) {
        menuItem.children = childrenItems;
      }
    }
    
    menuItems.push(menuItem);
  });
  
  return menuItems;
};