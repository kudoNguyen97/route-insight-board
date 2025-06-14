
import React, { useState } from 'react';
import { Layout, Menu, Space, Button } from 'antd';
import { Link, useLocation } from '@tanstack/react-router';
import {
  DashboardOutlined,
  TruckOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/shipments',
      icon: <TruckOutlined />,
      label: <Link to="/shipments">Shipments</Link>,
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/analytics">Analytics</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  const getPageTitle = () => {
    const route = menuItems.find(item => item.key === location.pathname);
    return route?.label.props.children || 'Dashboard';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="light"
        style={{
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
          fontWeight: 'bold',
          fontSize: collapsed ? 14 : 18,
          color: '#1890ff'
        }}>
          {collapsed ? 'LG' : 'LogiTrack'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, color: '#262626' }}>
            {getPageTitle()}
          </h2>
          <Space>
            <Button type="text" icon={<BellOutlined />} />
            <Button type="text" icon={<UserOutlined />} />
          </Space>
        </Header>
        
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
