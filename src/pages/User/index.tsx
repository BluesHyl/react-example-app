import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createTime: string;
}

const User: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加用户');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟获取用户数据
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    // 模拟API请求
    setTimeout(() => {
      const mockData: UserType[] = [
        {
          id: '1',
          name: '张三',
          email: 'zhangsan@example.com',
          role: 'admin',
          status: 'active',
          createTime: '2023-01-15 08:30:00',
        },
        {
          id: '2',
          name: '李四',
          email: 'lisi@example.com',
          role: 'editor',
          status: 'active',
          createTime: '2023-02-20 10:15:00',
        },
        {
          id: '3',
          name: '王五',
          email: 'wangwu@example.com',
          role: 'user',
          status: 'inactive',
          createTime: '2023-03-05 14:45:00',
        },
        {
          id: '4',
          name: '赵六',
          email: 'zhaoliu@example.com',
          role: 'user',
          status: 'active',
          createTime: '2023-04-10 09:20:00',
        },
      ];
      setUserData(mockData);
      setLoading(false);
    }, 1000);
  };

  // 表格列定义
  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const roleMap: Record<string, { color: string; text: string }> = {
          admin: { color: '#f50', text: '管理员' },
          editor: { color: '#108ee9', text: '编辑者' },
          user: { color: '#87d068', text: '普通用户' },
        };
        
        return (
          <span style={{ color: roleMap[role]?.color }}>
            {roleMap[role]?.text || role}
          </span>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        return status === 'active' ? (
          <span className="text-green-500">启用</span>
        ) : (
          <span className="text-red-500">禁用</span>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 处理添加用户
  const handleAdd = () => {
    setModalTitle('添加用户');
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理编辑用户
  const handleEdit = (record: UserType) => {
    setModalTitle('编辑用户');
    setEditingId(record.id);
    form.setFieldsValue({
      ...record
  });
    setModalVisible(true);
  };

  // 处理删除用户
  const handleDelete = (id: string) => {
    setUserData(userData.filter(item => item.id !== id));
    message.success('删除成功');
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingId) {
        // 更新用户
        setUserData(userData.map(item => 
          item.id === editingId 
            ? { 
                ...item, 
                name: values.name, 
                email: values.email, 
                role: values.role, 
                status: values.status 
              } 
            : item
        ));
        message.success('更新成功');
      } else {
        // 添加用户
        const newUser: UserType = {
          id: (userData.length + 1).toString(),
          name: values.name,
          email: values.email,
          role: values.role,
          status: values.status,
          createTime: new Date().toLocaleString(),
        };
        setUserData([...userData, newUser]);
        message.success('添加成功');
      }
      setModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="用户管理"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            添加用户
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={userData} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="editor">编辑者</Select.Option>
              <Select.Option value="user">普通用户</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;