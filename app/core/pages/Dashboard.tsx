/**
 * Base Dashboard Page – do not modify.
 * Override by replacing app/extensions/pages/Dashboard.tsx
 */

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, Button, Typography, Space } from 'antd';
import { useAuthStore } from '../stores/auth-store';

const { Title, Paragraph } = Typography;

export function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Title level={2}>Dashboard</Title>
          <Space>
            <Link to="/home">
              <Button>Home</Button>
            </Link>
            <Button onClick={handleLogout}>Sign out</Button>
          </Space>
        </div>

        <Card className="mb-6">
          <Title level={4}>Welcome</Title>
          <Paragraph>
            Signed in as <strong>{user.email}</strong>
            {user.name && ` (${user.name})`}.
          </Paragraph>
          <Paragraph type="secondary">
            Base dashboard page – override in extensions/pages/Dashboard.tsx
          </Paragraph>
        </Card>

        <Card title="Quick links">
          <Space direction="vertical">
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </Space>
        </Card>
      </div>
    </div>
  );
}
