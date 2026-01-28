/**
 * Extended Login Page – banner, details, and branding.
 * Overrides base core/pages/Login.tsx without modifying it.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form, Input, Card, Button, Typography, Divider } from 'antd';
import { useAuthStore } from '~/core/stores/auth-store';
import { logger } from '~/core/logger';

const { Title, Text, Paragraph } = Typography;

const BANNER_CONTENT = {
  title: 'Enterprise Portal',
  tagline: 'Secure access to your workspace',
  details: [
    'Single sign-on (SSO) ready',
    'Role-based access control',
    '24/7 support',
    'Audit logs & compliance',
  ],
};

export function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    logger.info('Login attempt', { email: values.email });

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Banner */}
      <header className="bg-indigo-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold m-0">{BANNER_CONTENT.title}</h1>
            <p className="text-indigo-200 text-sm m-0 mt-1">{BANNER_CONTENT.tagline}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:support@company.com" className="text-indigo-200 hover:text-white">
              Support
            </a>
            <Link to="/home" className="text-indigo-200 hover:text-white">
              Home
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row items-stretch max-w-6xl w-full mx-auto p-4 lg:p-8 gap-8">
        {/* Left: Details / Info */}
        <aside className="lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
          <Card className="border-0 shadow-sm bg-white/80">
            <Title level={3} className="!mt-0">
              Why sign in?
            </Title>
            <Paragraph type="secondary" className="mb-4">
              Access your dashboard, manage projects, and collaborate with your team.
            </Paragraph>
            <ul className="list-none pl-0 space-y-2">
              {BANNER_CONTENT.details.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Divider />
            <Paragraph type="secondary" className="text-sm mb-0">
              New user? <Link to="/signup">Create an account</Link> to get started.
              Need help? Contact <a href="mailto:support@company.com">support@company.com</a>.
            </Paragraph>
          </Card>
        </aside>

        {/* Right: Login Form */}
        <main className="lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
          <Card className="w-full max-w-md shadow-lg">
            <Title level={2} className="text-center !mt-0">
              Sign in
            </Title>
            <Text type="secondary" className="block text-center mb-6">
              Enter your work email and password
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

              <div className="flex justify-end mb-4">
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-indigo-600">
                  Forgot password?
                </Link>
              </div>

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

            <div className="mt-6 text-center text-sm text-gray-500">
              <Link to="/signup">Create account</Link>
              <span className="mx-2">·</span>
              <a href="#">Terms</a>
              <span className="mx-2">·</span>
              <a href="#">Privacy</a>
            </div>
          </Card>
        </main>
      </div>

      {/* Footer banner */}
      <footer className="bg-gray-100 border-t border-gray-200 px-6 py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Company. Extended login page – override in app/extensions/pages/Login.tsx
      </footer>
    </div>
  );
}
