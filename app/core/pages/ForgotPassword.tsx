/**
 * Base Forgot Password Page – do not modify.
 * Override by replacing app/extensions/pages/ForgotPassword.tsx
 */

import React, { useState } from 'react';
import { Link } from 'react-router';
import { Form, Input, Card, Button, Typography, message } from 'antd';
import { logger } from '../logger';

const { Title, Text } = Typography;

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    logger.info('Password reset request', { email: values.email });

    // Base: demo reset
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      message.success('Password reset link sent to your email');
      logger.info('Password reset email sent');
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md shadow-md">
          <Title level={2} className="text-center">
            Check your email
          </Title>
          <Text type="secondary" className="block text-center mb-6">
            We've sent a password reset link to your email address.
          </Text>
          <div className="text-center space-y-2">
            <Link to="/login">
              <Button type="primary" block>
                Back to Sign in
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <Title level={2} className="text-center">
          Forgot password
        </Title>
        <Text type="secondary" className="block text-center mb-6">
          Enter your email and we'll send you a reset link
        </Text>

        <Form
          name="forgot-password"
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

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Send reset link
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <Link to="/login">Back to Sign in</Link>
        </div>
      </Card>
    </div>
  );
}
