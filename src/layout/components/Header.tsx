import React from 'react';
import { Layout } from 'antd';

const { Header: AntdHeader } = Layout;

interface HeaderProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ style, className, children }) => {
  return (
    <AntdHeader style={style} className={className}>
      {children}
    </AntdHeader>
  );
};

export default Header;