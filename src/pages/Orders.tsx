
import React, { useState } from 'react';
import { Card, Table, Button, Input, Select, Tag, Space, Modal, Form, DatePicker, Row, Col, Statistic, Steps } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

const { Search } = Input;
const { Option } = Select;
const { Step } = Steps;

// Mock data for orders
const fetchOrders = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      key: '1',
      id: 'ORD001',
      customer: 'ABC Corporation',
      product: 'Industrial Equipment',
      quantity: 5,
      value: 125000,
      status: 'Processing',
      priority: 'High',
      orderDate: '2024-06-10',
      deliveryDate: '2024-06-20',
      address: '123 Business Ave, New York, NY',
    },
    {
      key: '2',
      id: 'ORD002',
      customer: 'XYZ Industries',
      product: 'Raw Materials',
      quantity: 12,
      value: 89000,
      status: 'Shipped',
      priority: 'Medium',
      orderDate: '2024-06-08',
      deliveryDate: '2024-06-18',
      address: '456 Factory St, Chicago, IL',
    },
    {
      key: '3',
      id: 'ORD003',
      customer: 'Tech Solutions Ltd',
      product: 'Computer Hardware',
      quantity: 25,
      value: 156000,
      status: 'Pending',
      priority: 'Low',
      orderDate: '2024-06-12',
      deliveryDate: '2024-06-25',
      address: '789 Tech Park, San Francisco, CA',
    },
    {
      key: '4',
      id: 'ORD004',
      customer: 'Global Retail Co',
      product: 'Consumer Goods',
      quantity: 100,
      value: 234000,
      status: 'Delivered',
      priority: 'High',
      orderDate: '2024-06-05',
      deliveryDate: '2024-06-15',
      address: '321 Mall Blvd, Los Angeles, CA',
    },
    {
      key: '5',
      id: 'ORD005',
      customer: 'Healthcare Plus',
      product: 'Medical Equipment',
      quantity: 8,
      value: 98000,
      status: 'Cancelled',
      priority: 'Medium',
      orderDate: '2024-06-11',
      deliveryDate: '2024-06-22',
      address: '654 Medical Center, Houston, TX',
    },
  ];
};

const Orders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [form] = Form.useForm();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'green';
      case 'Shipped': return 'blue';
      case 'Processing': return 'orange';
      case 'Pending': return 'gold';
      case 'Cancelled': return 'red';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'default';
    }
  };

  const getOrderSteps = (status) => {
    const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const currentStep = steps.indexOf(status);
    return { steps, currentStep: currentStep === -1 ? 0 : currentStep };
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => `$${value.toLocaleString()}`,
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Shipped', value: 'Shipped' },
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Cancelled', value: 'Cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
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
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setModalVisible(true);
            }}
          >
            View
          </Button>
          <Button type="link" icon={<EditOutlined />}>Edit</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
        </Space>
      ),
    },
  ];

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = orders?.reduce((sum, order) => sum + order.value, 0) || 0;

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Orders Management</h1>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>Manage customer orders and tracking</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic title="Total Orders" value={orders?.length || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic 
              title="Pending Orders" 
              value={orders?.filter(o => o.status === 'Pending').length || 0}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic 
              title="Total Value" 
              value={totalValue}
              formatter={(value) => `$${value.toLocaleString()}`}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic 
              title="Completed" 
              value={orders?.filter(o => o.status === 'Delivered').length || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        {/* Filters and Search */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <Space wrap>
            <Search
              placeholder="Search orders..."
              allowClear
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 130 }}
            >
              <Option value="all">All Status</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Space>
          
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>New Order</Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrders}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Order Information" size="small">
                  <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                  <p><strong>Product:</strong> {selectedOrder.product}</p>
                  <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                  <p><strong>Value:</strong> ${selectedOrder.value.toLocaleString()}</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Status & Priority" size="small">
                  <p><strong>Status:</strong> <Tag color={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Tag></p>
                  <p><strong>Priority:</strong> <Tag color={getPriorityColor(selectedOrder.priority)}>{selectedOrder.priority}</Tag></p>
                  <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
                  <p><strong>Delivery Date:</strong> {selectedOrder.deliveryDate}</p>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Delivery Address" size="small">
                  <p>{selectedOrder.address}</p>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Order Progress" size="small">
                  <Steps current={getOrderSteps(selectedOrder.status).currentStep} size="small">
                    {getOrderSteps(selectedOrder.status).steps.map(step => (
                      <Step key={step} title={step} />
                    ))}
                  </Steps>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
