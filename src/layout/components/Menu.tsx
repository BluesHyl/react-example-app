import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { useNavigate } from 'react-router';
import { useMenu } from '@/hooks/useMenu';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { asyncRoutes } from '@/router/index';

const Menu: React.FC = (props:any) => {
  const navigate = useNavigate();
  const { menuItems } = useMenu();
  console.log('Menu items:', menuItems, asyncRoutes);
  // [
  //   {
  //     key: '/home',
  //     icon: <HomeOutlined />,
  //     label: '首页',
  //   },
  //   {
  //     key: '/user',
  //     icon: <UserOutlined />,
  //     label: '用户管理',
  //   },
  //   {
  //     key: '/settings',
  //     icon: <SettingOutlined />,
  //     label: '系统设置',
  //   },
  // ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntdMenu
      theme="light"
      mode="inline"
      selectedKeys={props?.selectedKeys}
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};

export default Menu;