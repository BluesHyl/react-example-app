import React, { useState } from 'react';
import { Card, Form, Switch, Select, Radio, InputNumber, Button, message, Tabs, Divider } from 'antd';
import type { TabsProps } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 模拟保存设置
  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('保存的设置:', values);
      message.success('设置保存成功');
    } catch (error) {
      message.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 系统设置表单
  const SystemSettings = () => (
    <Form
      layout="vertical"
      initialValues={{
        theme: 'light',
        language: 'zh_CN',
        menuMode: 'side',
        pageSize: 10,
        enableNotification: true,
        enableEmailNotification: false,
        enableSound: true,
      }}
      onFinish={handleSave}
      form={form}
    >
      <Form.Item
        label="系统主题"
        name="theme"
        extra="选择系统的显示主题"
      >
        <Radio.Group>
          <Radio.Button value="light">浅色</Radio.Button>
          <Radio.Button value="dark">深色</Radio.Button>
          <Radio.Button value="system">跟随系统</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="系统语言"
        name="language"
        extra="选择系统显示语言"
      >
        <Select>
          <Select.Option value="zh_CN">简体中文</Select.Option>
          <Select.Option value="en_US">English</Select.Option>
          <Select.Option value="ja_JP">日本語</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="菜单模式"
        name="menuMode"
        extra="设置系统菜单的显示模式"
      >
        <Radio.Group>
          <Radio.Button value="side">侧边菜单</Radio.Button>
          <Radio.Button value="top">顶部菜单</Radio.Button>
          <Radio.Button value="mix">混合菜单</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="表格分页"
        name="pageSize"
        extra="设置表格每页显示的数据条数"
      >
        <InputNumber min={5} max={100} />
      </Form.Item>

      <Divider />

      <Form.Item
        label="系统通知"
        name="enableNotification"
        valuePropName="checked"
        extra="是否启用系统通知"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="邮件通知"
        name="enableEmailNotification"
        valuePropName="checked"
        extra="是否启用邮件通知"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="声音提醒"
        name="enableSound"
        valuePropName="checked"
        extra="是否启用声音提醒"
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          icon={<SaveOutlined />}
          loading={loading}
        >
          保存设置
        </Button>
      </Form.Item>
    </Form>
  );

  // 个人设置表单
  const PersonalSettings = () => (
    <Form
      layout="vertical"
      initialValues={{
        emailNotification: true,
        smsNotification: false,
        newsletter: true,
        autoSave: true,
      }}
      onFinish={handleSave}
    >
      <Form.Item
        label="邮件提醒"
        name="emailNotification"
        valuePropName="checked"
        extra="接收重要更新和通知的邮件"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="短信提醒"
        name="smsNotification"
        valuePropName="checked"
        extra="接收重要更新和通知的短信"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="订阅周报"
        name="newsletter"
        valuePropName="checked"
        extra="订阅每周系统更新和新功能通知"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="自动保存"
        name="autoSave"
        valuePropName="checked"
        extra="自动保存编辑中的内容"
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          icon={<SaveOutlined />}
          loading={loading}
        >
          保存设置
        </Button>
      </Form.Item>
    </Form>
  );

  // 安全设置表单
  const SecuritySettings = () => (
    <Form
      layout="vertical"
      initialValues={{
        twoFactor: false,
        loginNotification: true,
        passwordExpiry: 30,
      }}
      onFinish={handleSave}
    >
      <Form.Item
        label="两步验证"
        name="twoFactor"
        valuePropName="checked"
        extra="启用两步验证以提高账户安全性"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="登录通知"
        name="loginNotification"
        valuePropName="checked"
        extra="在新设备登录时发送通知"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="密码有效期"
        name="passwordExpiry"
        extra="设置密码需要更新的天数（0表示永不过期）"
      >
        <InputNumber min={0} max={365} />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          icon={<SaveOutlined />}
          loading={loading}
        >
          保存设置
        </Button>
      </Form.Item>
    </Form>
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '系统设置',
      children: <SystemSettings />,
    },
    {
      key: '2',
      label: '个人设置',
      children: <PersonalSettings />,
    },
    {
      key: '3',
      label: '安全设置',
      children: <SecuritySettings />,
    },
  ];

  return (
    <Card title="系统设置">
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default Settings;