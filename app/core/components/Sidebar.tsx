/**
 * Base Sidebar Component – wraps Ant Design Layout.Sider.
 * Extend by creating app/extensions/components/Sidebar.tsx
 */

import React from 'react';
import { Layout } from 'antd';
import type { SiderProps } from 'antd/es/layout/Sider';

const { Sider } = Layout;

export interface SidebarProps extends SiderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  menu?: React.ReactNode;
  logo?: React.ReactNode;
}

export function Sidebar({
  collapsed = false,
  onCollapse,
  menu,
  logo,
  className,
  ...props
}: SidebarProps) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className={`base-sidebar ${className ?? ''}`.trim()}
      theme="light"
      width={250}
      collapsedWidth={80}
      {...props}
    >
      {logo && (
        <div className="sidebar-logo p-4 flex items-center justify-center border-b">
          {logo}
        </div>
      )}
      {menu && <div className="sidebar-menu">{menu}</div>}
    </Sider>
  );
}
