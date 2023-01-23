import { Menu } from 'antd';
import {
    UserOutlined,
  } from '@ant-design/icons';
import {useNavigate}  from 'react-router';
const SideNav = () => {
    const history = useNavigate();
const handleUserClick = () => {
        history('/list');
    }

return (
      <div>
        <div style={{height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px"}}></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={handleUserClick}>
                    <UserOutlined />
                    <span> posts</span>
                </Menu.Item>
            </Menu>
        </div>
  );
}
export default SideNav;