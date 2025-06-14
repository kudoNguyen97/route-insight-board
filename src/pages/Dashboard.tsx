import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import {
  TruckOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import ShipmentChart from '../components/ShipmentChart';
import FleetStatus from '../components/FleetStatus';
import RecentOrders from '../components/RecentOrders';

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
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  return (
    <div style={{ margin: '24px', background: '#f5f5f5' }}>
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
    </div>
  );
};

export default Dashboard;
