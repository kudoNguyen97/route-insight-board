
import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Progress, Space, Button } from 'antd';
import {
  DashboardOutlined,
  TruckOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import ShipmentChart from '../components/ShipmentChart';
import FleetStatus from '../components/FleetStatus';
import RecentOrders from '../components/RecentOrders';
import Shipments from './Shipments';
import Orders from './Orders';
import Analytics from './Analytics';
import Settings from './Settings';

const { Header, Sider, Content } = Layout;

// Mock data fetching functions
const fetchDashboardStats = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalShipments: 1247,
    activeVehicles: 18,
    pendingOrders: 89,
    deliveryRate: 94.2,
    shipmentsChange: 12.3,
    vehiclesChange: -2.1,
    ordersChange: 8.7,
    deliveryChange: 1.2,
  };
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <TruckOutlined />,
      label: 'Shipments',
    },
    {
      key: '3',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case '2':
        return <Shipments />;
      case '3':
        return <Orders />;
      case '4':
        return <Analytics />;
      case '5':
        return <Settings />;
      default:
        return (
          <Content style={{ margin: '24px', background: '#f5f5f5' }}>
            <Row gutter={[24, 24]}>
              {/* Stats Cards */}
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Shipments"
                    value={stats?.totalShipments || 0}
                    loading={isLoading}
                    prefix={<TruckOutlined style={{ color: '#1890ff' }} />}
                    suffix={
                      <span style={{ fontSize: 12, color: '#52c41a' }}>
                        <ArrowUpOutlined /> {stats?.shipmentsChange || 0}%
                      </span>
                    }
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Active Vehicles"
                    value={stats?.activeVehicles || 0}
                    loading={isLoading}
                    prefix={<TruckOutlined style={{ color: '#52c41a' }} />}
                    suffix={
                      <span style={{ fontSize: 12, color: '#ff4d4f' }}>
                        <ArrowDownOutlined /> {Math.abs(stats?.vehiclesChange || 0)}%
                      </span>
                    }
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Pending Orders"
                    value={stats?.pendingOrders || 0}
                    loading={isLoading}
                    prefix={<ShoppingCartOutlined style={{ color: '#faad14' }} />}
                    suffix={
                      <span style={{ fontSize: 12, color: '#52c41a' }}>
                        <ArrowUpOutlined /> {stats?.ordersChange || 0}%
                      </span>
                    }
                  />
                </Card>
              </Col>
              
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Delivery Rate"
                    value={stats?.deliveryRate || 0}
                    precision={1}
                    suffix="%"
                    loading={isLoading}
                    prefix={<BarChartOutlined style={{ color: '#52c41a' }} />}
                  />
                  <Progress 
                    percent={stats?.deliveryRate || 0} 
                    showInfo={false} 
                    strokeColor="#52c41a"
                    style={{ marginTop: 8 }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              {/* Charts Section */}
              <Col xs={24} lg={16}>
                <Card title="Shipments Overview" style={{ height: 400 }}>
                  <ShipmentChart />
                </Card>
              </Col>
              
              <Col xs={24} lg={8}>
                <Card title="Fleet Status" style={{ height: 400 }}>
                  <FleetStatus />
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              {/* Recent Orders Table */}
              <Col span={24}>
                <Card title="Recent Orders">
                  <RecentOrders />
                </Card>
              </Col>
            </Row>
          </Content>
        );
    }
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
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0 }}
          onSelect={({ key }) => setSelectedKey(key)}
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
            {menuItems.find(item => item.key === selectedKey)?.label || 'Dashboard'}
          </h2>
          <Space>
            <Button type="text" icon={<BellOutlined />} />
            <Button type="text" icon={<UserOutlined />} />
          </Space>
        </Header>
        
        {renderContent()}
      </Layout>
    </Layout>
  );
};

export default Dashboard;
