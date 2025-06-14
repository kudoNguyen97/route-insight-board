
import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Select, Divider, Row, Col, Avatar, Upload, message, Tabs, Table, Modal } from 'antd';
import { UserOutlined, UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined, BellOutlined, SecurityScanOutlined, TeamOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Mock data for users
const mockUsers = [
  { key: '1', name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'Active' },
  { key: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Manager', status: 'Active' },
  { key: '3', name: 'Mike Wilson', email: 'mike@company.com', role: 'Driver', status: 'Active' },
  { key: '4', name: 'Emma Davis', email: 'emma@company.com', role: 'Operator', status: 'Inactive' },
];

const Settings = () => {
  const [form] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleProfileSubmit = (values) => {
    console.log('Profile settings:', values);
    message.success('Profile settings updated successfully');
  };

  const handleNotificationSubmit = (values) => {
    console.log('Notification settings:', values);
    message.success('Notification settings updated successfully');
  };

  const handleUserSubmit = (values) => {
    console.log('User data:', values);
    message.success(selectedUser ? 'User updated successfully' : 'User created successfully');
    setUserModalVisible(false);
    setSelectedUser(null);
  };

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'Active' ? '#52c41a' : '#ff4d4f' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setUserModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Settings</h1>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>Manage your account and application settings</p>
      </div>

      <Tabs defaultActiveKey="profile" type="card">
        {/* Profile Settings */}
        <TabPane 
          tab={
            <span>
              <UserOutlined />
              Profile
            </span>
          } 
          key="profile"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card title="Profile Picture">
                <div style={{ textAlign: 'center' }}>
                  <Avatar size={120} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
                  <br />
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={16}>
              <Card title="Personal Information">
                <Form
                  form={form}
                  onFinish={handleProfileSubmit}
                  layout="vertical"
                  initialValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@company.com',
                    phone: '+1 (555) 123-4567',
                    position: 'Logistics Manager',
                    department: 'Operations',
                    timezone: 'America/New_York',
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Phone" name="phone">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Position" name="position">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Department" name="department">
                        <Select>
                          <Option value="Operations">Operations</Option>
                          <Option value="Logistics">Logistics</Option>
                          <Option value="Management">Management</Option>
                          <Option value="Sales">Sales</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item label="Timezone" name="timezone">
                    <Select>
                      <Option value="America/New_York">Eastern Time</Option>
                      <Option value="America/Chicago">Central Time</Option>
                      <Option value="America/Denver">Mountain Time</Option>
                      <Option value="America/Los_Angeles">Pacific Time</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Notification Settings */}
        <TabPane 
          tab={
            <span>
              <BellOutlined />
              Notifications
            </span>
          } 
          key="notifications"
        >
          <Card>
            <Form
              form={notificationForm}
              onFinish={handleNotificationSubmit}
              layout="vertical"
              initialValues={{
                emailNotifications: true,
                smsNotifications: false,
                orderUpdates: true,
                shipmentAlerts: true,
                systemMaintenance: true,
                weeklyReports: false,
              }}
            >
              <Divider>Email Notifications</Divider>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item name="emailNotifications" valuePropName="checked">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>Enable Email Notifications</strong>
                        <br />
                        <span style={{ color: '#666' }}>Receive notifications via email</span>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="orderUpdates" valuePropName="checked">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>Order Updates</strong>
                        <br />
                        <span style={{ color: '#666' }}>Get notified about order status changes</span>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="shipmentAlerts" valuePropName="checked">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>Shipment Alerts</strong>
                        <br />
                        <span style={{ color: '#666' }}>Receive alerts for shipment delays or issues</span>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <Divider>SMS Notifications</Divider>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item name="smsNotifications" valuePropName="checked">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>Enable SMS Notifications</strong>
                        <br />
                        <span style={{ color: '#666' }}>Receive critical alerts via SMS</span>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <Divider>Reports</Divider>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item name="weeklyReports" valuePropName="checked">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>Weekly Performance Reports</strong>
                        <br />
                        <span style={{ color: '#666' }}>Receive weekly summary reports</span>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="systemMaintenance" valuePropName="checked">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>System Maintenance</strong>
                        <br />
                        <span style={{ color: '#666' }}>Get notified about system updates and maintenance</span>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ marginTop: '24px' }}>
                <Button type="primary" htmlType="submit">
                  Save Notification Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        {/* Security Settings */}
        <TabPane 
          tab={
            <span>
              <SecurityScanOutlined />
              Security
            </span>
          } 
          key="security"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Change Password">
                <Form layout="vertical">
                  <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label="New Password" name="newPassword" rules={[{ required: true, min: 8 }]}>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label="Confirm New Password" name="confirmPassword" rules={[{ required: true }]}>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">Update Password</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card title="Two-Factor Authentication">
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <strong>Enable 2FA</strong>
                      <br />
                      <span style={{ color: '#666' }}>Add an extra layer of security to your account</span>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button type="default">Setup Authenticator App</Button>
              </Card>
              
              <Card title="Login Sessions" style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Current Session</strong>
                  <br />
                  <span style={{ color: '#666' }}>Chrome on Windows - New York, NY</span>
                  <br />
                  <span style={{ color: '#666', fontSize: '12px' }}>Active now</span>
                </div>
                <Button type="default" danger>Terminate All Other Sessions</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* User Management */}
        <TabPane 
          tab={
            <span>
              <TeamOutlined />
              Users
            </span>
          } 
          key="users"
        >
          <Card 
            title="User Management"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedUser(null);
                  setUserModalVisible(true);
                }}
              >
                Add User
              </Button>
            }
          >
            <Table
              columns={userColumns}
              dataSource={mockUsers}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        {/* System Settings */}
        <TabPane 
          tab={
            <span>
              <SettingOutlined />
              System
            </span>
          } 
          key="system"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="General Settings">
                <Form layout="vertical">
                  <Form.Item label="Company Name" initialValue="LogiTrack Solutions">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Default Currency" initialValue="USD">
                    <Select>
                      <Option value="USD">USD - US Dollar</Option>
                      <Option value="EUR">EUR - Euro</Option>
                      <Option value="GBP">GBP - British Pound</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Date Format" initialValue="MM/DD/YYYY">
                    <Select>
                      <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                      <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                      <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">Save Settings</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card title="Data & Privacy">
                <div style={{ marginBottom: '16px' }}>
                  <Button type="default" style={{ marginRight: '8px', marginBottom: '8px' }}>
                    Export Data
                  </Button>
                  <Button type="default" style={{ marginBottom: '8px' }}>
                    Download Report
                  </Button>
                </div>
                <Divider />
                <div>
                  <h4 style={{ color: '#ff4d4f' }}>Danger Zone</h4>
                  <p style={{ color: '#666', marginBottom: '16px' }}>
                    These actions cannot be undone. Please be careful.
                  </p>
                  <Button danger>Clear All Data</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* User Modal */}
      <Modal
        title={selectedUser ? 'Edit User' : 'Add New User'}
        open={userModalVisible}
        onCancel={() => {
          setUserModalVisible(false);
          setSelectedUser(null);
        }}
        footer={null}
      >
        <Form
          onFinish={handleUserSubmit}
          layout="vertical"
          initialValues={selectedUser || {}}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Operator">Operator</Option>
              <Option value="Driver">Driver</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {selectedUser ? 'Update User' : 'Create User'}
              </Button>
              <Button onClick={() => {
                setUserModalVisible(false);
                setSelectedUser(null);
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
