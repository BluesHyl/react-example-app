import { Menu as AntdMenu } from 'antd';
import type { MenuProps } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
        {
            key: '/home',
            label: 'Home',
            icon: <AppstoreOutlined />,
        },
        {
            key: '/about',
            label: 'About',
            icon: <AppstoreOutlined />,
        },
        {
            key: '/3',
            label: 'Contact',
            icon: <AppstoreOutlined />,
        },
    ];
function Menu() {
    const onClick: MenuProps['onClick'] = (info) => {
    const navigate = useNavigate();
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