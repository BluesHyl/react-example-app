import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Progress, List, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  progress: number;
  status: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState<DataType[]>([]);
  const [activityData, setActivityData] = useState<ActivityItem[]>([]);

  // 模拟获取数据
  useEffect(() => {
    const fetchData = () => {
      // 模拟API请求延迟
      setTimeout(() => {
        // 项目数据
        const mockProjectData: DataType[] = [
          {
            key: '1',
            name: '电商平台开发',
            progress: 70,
            status: '进行中',
          },
          {
            key: '2',
            name: '移动应用更新',
            progress: 90,
            status: '即将完成',
          },
          {
            key: '3',
            name: '数据分析系统',
            progress: 30,
            status: '进行中',
          },
          {
            key: '4',
            name: '用户管理模块',
            progress: 100,
            status: '已完成',
          },
        ];

        // 活动数据
        const mockActivityData: ActivityItem[] = [
          {
            id: '1',
            user: '张三',
            action: '创建了任务',
            target: '首页设计',
            time: '10分钟前',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          {
            id: '2',
            user: '李四',
            action: '完成了任务',
            target: '用户认证功能',
            time: '30分钟前',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          {
            id: '3',
            user: '王五',
            action: '评论了任务',
            target: '数据可视化',
            time: '1小时前',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          },
          {
            id: '4',
            user: '赵六',
            action: '上传了文件',
            target: '产品原型设计稿',
            time: '2小时前',
            avatar: 'https://randomuser.me/api/portraits/women/30.jpg',
          },
        ];

        setProjectData(mockProjectData);
        setActivityData(mockActivityData);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" status={progress === 100 ? 'success' : 'active'} />
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="用户总数"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="订单总数"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="文章总数"
              value={56}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="团队成员"
              value={12}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={16}>
          <Card title="项目进度" loading={loading}>
            <Table 
              columns={columns} 
              dataSource={projectData} 
              pagination={false} 
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="最近活动" loading={loading}>
            <List
              itemLayout="horizontal"
              dataSource={activityData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<span>{item.user} {item.action}</span>}
                    description={
                      <div>
                        <div>{item.target}</div>
                        <div className="text-gray-400 text-xs">{item.time}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;