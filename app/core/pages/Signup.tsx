/**
 * Base Signup Page – do not modify.
 * Override by replacing app/extensions/pages/Signup.tsx
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form, Input, Card, Button, Typography } from 'antd';
import { useAuthStore } from '../stores/auth-store';
import { logger } from '../logger';

const { Title, Text } = Typography;

export function Signup() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    logger.info('Signup attempt', { email: values.email });

    // Base: demo registration
    setTimeout(() => {
      setAuth(
        { id: '1', email: values.email, name: values.name },
        'demo-token'
      );
      logger.info('Signup success');
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <Title level={2} className="text-center">
          Create account
        </Title>
        <Text type="secondary" className="block text-center mb-6">
          Base signup page – override in extensions/pages/Signup.tsx
        </Text>

        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your name" size="large" />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
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
              Create account
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </Card>
    </div>
  );
}
