
import React, { useState } from 'react';
import { Card, Table, Button, Input, Select, Tag, Space, Drawer, Form, DatePicker, Row, Col, Statistic } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for shipments
const fetchShipments = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      key: '1',
      id: 'SH001',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      status: 'In Transit',
      driver: 'John Smith',
      vehicle: 'TRK-001',
      cargo: 'Electronics',
      weight: '2.5 tons',
      estimatedDelivery: '2024-06-16',
      progress: 65,
    },
    {
      key: '2',
      id: 'SH002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      status: 'Delivered',
      driver: 'Sarah Johnson',
      vehicle: 'TRK-002',
      cargo: 'Furniture',
      weight: '3.2 tons',
      estimatedDelivery: '2024-06-14',
      progress: 100,
    },
    {
      key: '3',
      id: 'SH003',
      origin: 'Seattle, WA',
      destination: 'Denver, CO',
      status: 'Pending',
      driver: 'Mike Wilson',
      vehicle: 'TRK-003',
      cargo: 'Medical Supplies',
      weight: '1.8 tons',
      estimatedDelivery: '2024-06-18',
      progress: 0,
    },
    {
      key: '4',
      id: 'SH004',
      origin: 'Houston, TX',
      destination: 'Phoenix, AZ',
      status: 'In Transit',
      driver: 'Emma Davis',
      vehicle: 'TRK-004',
      cargo: 'Food Products',
      weight: '2.1 tons',
      estimatedDelivery: '2024-06-17',
      progress: 45,
    },
    {
      key: '5',
      id: 'SH005',
      origin: 'Boston, MA',
      destination: 'Atlanta, GA',
      status: 'Delayed',
      driver: 'Robert Brown',
      vehicle: 'TRK-005',
      cargo: 'Textiles',
      weight: '2.8 tons',
      estimatedDelivery: '2024-06-19',
      progress: 30,
    },
  ];
};

const Shipments = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: shipments, isLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: fetchShipments,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'green';
      case 'In Transit': return 'blue';
      case 'Pending': return 'orange';
      case 'Delayed': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Shipment ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
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
      filters: [
        { text: 'Delivered', value: 'Delivered' },
        { text: 'In Transit', value: 'In Transit' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Delayed', value: 'Delayed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      key: 'cargo',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Est. Delivery',
      dataIndex: 'estimatedDelivery',
      key: 'estimatedDelivery',
      sorter: (a, b) => new Date(a.estimatedDelivery) - new Date(b.estimatedDelivery),
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
              setSelectedShipment(record);
              setDrawerVisible(true);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const filteredShipments = shipments?.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchText.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchText.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Shipments Management</h1>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>Track and manage all shipments</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic title="Total Shipments" value={shipments?.length || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic 
              title="In Transit" 
              value={shipments?.filter(s => s.status === 'In Transit').length || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic 
              title="Delivered" 
              value={shipments?.filter(s => s.status === 'Delivered').length || 0}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic 
              title="Delayed" 
              value={shipments?.filter(s => s.status === 'Delayed').length || 0}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        {/* Filters and Search */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <Space wrap>
            <Search
              placeholder="Search shipments..."
              allowClear
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
            >
              <Option value="all">All Status</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="In Transit">In Transit</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Delayed">Delayed</Option>
            </Select>
            <RangePicker />
          </Space>
          
          <Space>
            <Button icon={<FilterOutlined />}>Advanced Filter</Button>
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button type="primary" icon={<PlusOutlined />}>New Shipment</Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredShipments}
          loading={isLoading}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Shipment Details Drawer */}
      <Drawer
        title="Shipment Details"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedShipment && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Basic Information" size="small">
                  <p><strong>Shipment ID:</strong> {selectedShipment.id}</p>
                  <p><strong>Status:</strong> <Tag color={getStatusColor(selectedShipment.status)}>{selectedShipment.status}</Tag></p>
                  <p><strong>Origin:</strong> {selectedShipment.origin}</p>
                  <p><strong>Destination:</strong> {selectedShipment.destination}</p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Logistics Details" size="small">
                  <p><strong>Driver:</strong> {selectedShipment.driver}</p>
                  <p><strong>Vehicle:</strong> {selectedShipment.vehicle}</p>
                  <p><strong>Cargo:</strong> {selectedShipment.cargo}</p>
                  <p><strong>Weight:</strong> {selectedShipment.weight}</p>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Timeline" size="small">
                  <p><strong>Estimated Delivery:</strong> {selectedShipment.estimatedDelivery}</p>
                  <p><strong>Progress:</strong> {selectedShipment.progress}%</p>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Shipments;
