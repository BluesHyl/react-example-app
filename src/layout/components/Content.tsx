import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import AuthGuard from '@/components/AuthGuard';
const { Content: AntdContent } = Layout;

interface ContentProps {
  style?: React.CSSProperties;
}

const Content: React.FC<ContentProps> = ({ style }) => {
  return (
    <AntdContent style={style}>
        <AuthGuard>
            <Outlet />
        </AuthGuard>
    </AntdContent>
  );
};

export default Content;