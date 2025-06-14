
import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Select, DatePicker, Space, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, TruckOutlined, DollarOutlined, ShopOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock analytics data
const fetchAnalyticsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    overview: {
      totalRevenue: 2845000,
      revenueChange: 12.5,
      totalShipments: 1247,
      shipmentsChange: 8.3,
      activeRoutes: 23,
      routesChange: -2.1,
      avgDeliveryTime: 2.8,
      deliveryTimeChange: -5.2,
    },
    revenueData: [
      { month: 'Jan', revenue: 185000, shipments: 156 },
      { month: 'Feb', revenue: 210000, shipments: 178 },
      { month: 'Mar', revenue: 235000, shipments: 195 },
      { month: 'Apr', revenue: 258000, shipments: 212 },
      { month: 'May', revenue: 280000, shipments: 234 },
      { month: 'Jun', revenue: 312000, shipments: 267 },
    ],
    shipmentsByStatus: [
      { name: 'Delivered', value: 687, color: '#52c41a' },
      { name: 'In Transit', value: 324, color: '#1890ff' },
      { name: 'Pending', value: 156, color: '#faad14' },
      { name: 'Delayed', value: 80, color: '#ff4d4f' },
    ],
    topRoutes: [
      { route: 'NY - LA', shipments: 89, revenue: 234000 },
      { route: 'Chicago - Miami', shipments: 76, revenue: 198000 },
      { route: 'Seattle - Denver', shipments: 65, revenue: 167000 },
      { route: 'Houston - Phoenix', shipments: 58, revenue: 145000 },
      { route: 'Boston - Atlanta', shipments: 52, revenue: 132000 },
    ],
    performanceMetrics: [
      { metric: 'On-Time Delivery', value: 94.2, target: 95 },
      { metric: 'Fleet Utilization', value: 87.5, target: 90 },
      { metric: 'Customer Satisfaction', value: 91.8, target: 92 },
      { metric: 'Cost Efficiency', value: 78.3, target: 85 },
    ],
  };
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: fetchAnalyticsData,
  });

  const COLORS = ['#52c41a', '#1890ff', '#faad14', '#ff4d4f'];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Analytics Dashboard</h1>
          <p style={{ color: '#666', margin: '8px 0 0 0' }}>Track performance and business insights</p>
        </div>
        <Space>
          <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
            <Option value="1month">1 Month</Option>
            <Option value="3months">3 Months</Option>
            <Option value="6months">6 Months</Option>
            <Option value="1year">1 Year</Option>
          </Select>
          <RangePicker />
        </Space>
      </div>

      {/* Overview Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={analytics?.overview.totalRevenue || 0}
              precision={0}
              formatter={(value) => `$${value.toLocaleString()}`}
              prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
              suffix={
                <span style={{ fontSize: 12, color: analytics?.overview.revenueChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                  {analytics?.overview.revenueChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(analytics?.overview.revenueChange || 0)}%
                </span>
              }
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Shipments"
              value={analytics?.overview.totalShipments || 0}
              prefix={<TruckOutlined style={{ color: '#1890ff' }} />}
              suffix={
                <span style={{ fontSize: 12, color: analytics?.overview.shipmentsChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                  {analytics?.overview.shipmentsChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(analytics?.overview.shipmentsChange || 0)}%
                </span>
              }
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Routes"
              value={analytics?.overview.activeRoutes || 0}
              prefix={<ShopOutlined style={{ color: '#faad14' }} />}
              suffix={
                <span style={{ fontSize: 12, color: analytics?.overview.routesChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                  {analytics?.overview.routesChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(analytics?.overview.routesChange || 0)}%
                </span>
              }
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Delivery Time"
              value={analytics?.overview.avgDeliveryTime || 0}
              precision={1}
              suffix="days"
              prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
              suffix={
                <span style={{ fontSize: 12, color: analytics?.overview.deliveryTimeChange < 0 ? '#52c41a' : '#ff4d4f' }}>
                  {analytics?.overview.deliveryTimeChange < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} {Math.abs(analytics?.overview.deliveryTimeChange || 0)}%
                </span>
              }
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {/* Revenue Trend */}
        <Col xs={24} lg={16}>
          <Card title="Revenue & Shipments Trend" loading={isLoading}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics?.revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#52c41a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#52c41a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis yAxisId="revenue" orientation="left" />
                <YAxis yAxisId="shipments" orientation="right" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area 
                  yAxisId="revenue"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#52c41a" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  name="Revenue ($)"
                />
                <Line 
                  yAxisId="shipments"
                  type="monotone" 
                  dataKey="shipments" 
                  stroke="#1890ff"
                  name="Shipments"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Shipments by Status */}
        <Col xs={24} lg={8}>
          <Card title="Shipments by Status" loading={isLoading}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.shipmentsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics?.shipmentsByStatus?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Top Routes */}
        <Col xs={24} lg={12}>
          <Card title="Top Performing Routes" loading={isLoading}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics?.topRoutes} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="route" type="category" width={80} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="shipments" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Performance Metrics */}
        <Col xs={24} lg={12}>
          <Card title="Performance Metrics" loading={isLoading}>
            <div style={{ padding: '16px 0' }}>
              {analytics?.performanceMetrics?.map((metric, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'medium' }}>{metric.metric}</span>
                    <span>{metric.value}% / {metric.target}%</span>
                  </div>
                  <Progress 
                    percent={(metric.value / metric.target) * 100} 
                    status={metric.value >= metric.target ? 'success' : metric.value >= metric.target * 0.8 ? 'active' : 'exception'}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
