/**
 * Base Auth Layout with Sidebar – for authenticated routes with sidebar.
 * Checks authentication, provides collapsible sidebar, header, and content area.
 * Override in app/extensions/layouts/AuthLayoutWithSidebar.tsx
 */

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Layout } from 'antd';
import { useAuthStore } from '../stores/auth-store';
import { Sidebar, Header, Content } from '../components';
import type { SidebarProps, HeaderProps } from '../components';

const { Layout: AntLayout } = Layout;

export interface AuthLayoutWithSidebarProps {
  children?: React.ReactNode;
  /**
   * Sidebar menu items
   */
  menuItems?: React.ReactNode;
  /**
   * Sidebar logo
   */
  sidebarLogo?: React.ReactNode;
  /**
   * Header left content
   */
  headerLeft?: React.ReactNode;
  /**
   * Header right content (e.g., user menu, notifications)
   */
  headerRight?: React.ReactNode;
  /**
   * Header title
   */
  headerTitle?: string;
  /**
   * Future: permission requirements
   */
  permissions?: {
    role?: string;
    permission?: string;
  };
  /**
   * Custom sidebar props
   */
  sidebarProps?: Partial<SidebarProps>;
  /**
   * Custom header props
   */
  headerProps?: Partial<HeaderProps>;
}

export function AuthLayoutWithSidebar({
  children,
  menuItems,
  sidebarLogo,
  headerLeft,
  headerRight,
  headerTitle,
  permissions,
  sidebarProps,
  headerProps,
}: AuthLayoutWithSidebarProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
    // Future: check permissions here
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  const defaultHeaderRight = headerRight || (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{user.email}</span>
      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Sign out
      </button>
    </div>
  );

  return (
    <AntLayout className="min-h-screen">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        menu={menuItems}
        logo={sidebarLogo}
        {...sidebarProps}
      />
      <AntLayout>
        <Header
          title={headerTitle}
          leftContent={headerLeft}
          rightContent={defaultHeaderRight}
          {...headerProps}
        />
        <Content>
          {children || <Outlet />}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}
