/**
 * Base Login Page – do not modify.
 * Override by replacing app/extensions/pages/Login.tsx
 */

import { Button, Card, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router';
import React, { useState } from 'react';

import { logger } from '../logger';
import { useAuthStore } from '../stores/auth-store';

const { Title, Text } = Typography;

export function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    logger.info('Login attempt', { email: values.email });

    // Base: demo auth (accept any email/password)
    setTimeout(() => {
      setAuth(
        { id: '1', email: values.email, name: values.email.split('@')[0] },
        'demo-token'
      );
      logger.info('Login success');
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <Title level={2} className="text-center">
          Sign in
        </Title>
        <Text type="secondary" className="block text-center mb-6">
          Base login page – override in extensions/pages/Login.tsx
        </Text>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="you@company.com" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <Link to="/signup">Create account</Link>
        </div>
      </Card>
    </div>
  );
}
