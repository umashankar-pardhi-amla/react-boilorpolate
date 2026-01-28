/**
 * Base Menu Component – wraps Ant Design Menu.
 * Extend by creating app/extensions/components/Menu.tsx
 */

import React from 'react';
import { Menu as AntMenu } from 'antd';
import type { MenuProps as AntMenuProps } from 'antd';
import { useLocation, Link } from 'react-router';

export interface MenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export interface MenuProps extends Omit<AntMenuProps, 'items'> {
  items: MenuItem[];
}

export function Menu({ items, ...props }: MenuProps) {
  const location = useLocation();

  const menuItems = items.map((item) => ({
    key: item.key,
    label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
    icon: item.icon,
    children: item.children?.map((child) => ({
      key: child.key,
      label: child.path ? <Link to={child.path}>{child.label}</Link> : child.label,
      icon: child.icon,
    })),
  }));

  return (
    <AntMenu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      {...props}
    />
  );
}
