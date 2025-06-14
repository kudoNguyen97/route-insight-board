
import React from 'react';
import { Table, Tag, Space, Button, Avatar } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface OrderRecord {
  key: string;
  orderId: string;
  customer: string;
  destination: string;
  status: string;
  priority: string;
  value: number;
  deliveryDate: string;
}

const mockData: OrderRecord[] = [
  {
    key: '1',
    orderId: 'ORD-2024-001',
    customer: 'Acme Corp',
    destination: 'New York, NY',
    status: 'In Transit',
    priority: 'High',
    value: 2500,
    deliveryDate: '2024-06-15',
  },
  {
    key: '2',
    orderId: 'ORD-2024-002',
    customer: 'Tech Solutions Inc',
    destination: 'Los Angeles, CA',
    status: 'Pending',
    priority: 'Medium',
    value: 1800,
    deliveryDate: '2024-06-16',
  },
  {
    key: '3',
    orderId: 'ORD-2024-003',
    customer: 'Global Logistics',
    destination: 'Chicago, IL',
    status: 'Delivered',
    priority: 'Low',
    value: 3200,
    deliveryDate: '2024-06-14',
  },
  {
    key: '4',
    orderId: 'ORD-2024-004',
    customer: 'Manufacturing Plus',
    destination: 'Houston, TX',
    status: 'Processing',
    priority: 'High',
    value: 4100,
    deliveryDate: '2024-06-17',
  },
  {
    key: '5',
    orderId: 'ORD-2024-005',
    customer: 'Retail Chain Co',
    destination: 'Miami, FL',
    status: 'In Transit',
    priority: 'Medium',
    value: 2900,
    deliveryDate: '2024-06-18',
  },
];

const RecentOrders = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'processing';
      case 'Pending': return 'warning';
      case 'Processing': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'default';
    }
  };

  const columns: ColumnsType<OrderRecord> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <a style={{ color: '#1890ff', fontWeight: 500 }}>{text}</a>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {text.charAt(0)}
          </Avatar>
          {text}
        </Space>
      ),
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>{priority}</Tag>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={mockData}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        showQuickJumper: true,
      }}
      size="middle"
      scroll={{ x: 800 }}
    />
  );
};

export default RecentOrders;
