// useMenu.ts
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { asyncRoutes, staticRoutes } from '@/router/index';
import { routesToMenuItems } from '@/utils/menuUtils';

export const useMenu = () => {
  const { user } = useUserStore();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  
  useEffect(() => {
    if (user && user.roles) {
      const mainLayoutRoute = asyncRoutes.find(route => route.path === '/');
      if (mainLayoutRoute && mainLayoutRoute.children) {
        const items = routesToMenuItems(mainLayoutRoute.children, '', user.roles);
        setMenuItems(items);
      }
    }
  }, [user]);
  
  return { menuItems };
};