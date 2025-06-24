import { Menu as AntdMenu } from 'antd';
import type { MenuProps } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
        {
            key: '/',
            label: 'Home',
            icon: <AppstoreOutlined />
        },
        {
            key: '/login',
            label: 'About',
            icon: <AppstoreOutlined />,
        },
        {
            key: '/home',
            label: 'Contact',
            icon: <AppstoreOutlined />,
        },
    ];
function Menu() {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (info) => {
        navigate(info.key);
    };
  return (
    <AntdMenu 
        onClick={onClick} 
        style={{ height: '100vh'}} 
        items={ items } />
  )
}
export default Menu;