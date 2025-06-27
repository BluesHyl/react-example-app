import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};

export default Menu;