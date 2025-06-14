
import React from 'react';
import { Space, Progress, Typography, Divider } from 'antd';
import { TruckOutlined, CheckCircleOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const fleetData = [
  { status: 'Active', count: 12, total: 18, color: '#52c41a', icon: <CheckCircleOutlined /> },
  { status: 'In Transit', count: 4, total: 18, color: '#1890ff', icon: <TruckOutlined /> },
  { status: 'Maintenance', count: 2, total: 18, color: '#faad14', icon: <ClockCircleOutlined /> },
  { status: 'Offline', count: 0, total: 18, color: '#ff4d4f', icon: <WarningOutlined /> },
];

const FleetStatus = () => {
  return (
    <div style={{ padding: '16px 0' }}>
      {fleetData.map((item, index) => (
        <div key={item.status}>
          <Space direction="vertical" style={{ width: '100%' }} size={8}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <span style={{ color: item.color, fontSize: 16 }}>{item.icon}</span>
                <Text strong>{item.status}</Text>
              </Space>
              <Text>{item.count}/{item.total}</Text>
            </div>
            <Progress
              percent={(item.count / item.total) * 100}
              strokeColor={item.color}
              showInfo={false}
              size="small"
            />
          </Space>
          {index < fleetData.length - 1 && <Divider style={{ margin: '16px 0' }} />}
        </div>
      ))}
      
      <Divider style={{ margin: '24px 0 16px 0' }} />
      
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ margin: 0, color: '#262626' }}>
          Fleet Efficiency
        </Title>
        <div style={{ marginTop: 16 }}>
          <Progress
            type="circle"
            percent={88}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            size={80}
          />
        </div>
        <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
          Overall Performance
        </Text>
      </div>
    </div>
  );
};

export default FleetStatus;
