/**
 * Base Menu Configuration – default menu items.
 * Override in app/extensions/config/menu.ts
 */

import React from 'react';
import type { MenuItem } from '../components/Menu';
import { HomeOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';

export const defaultMenuItems: MenuItem[] = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: React.createElement(DashboardOutlined),
  },
  {
    key: '/home',
    label: 'Home',
    path: '/home',
    icon: React.createElement(HomeOutlined),
  },
  {
    key: '/extensions-demo',
    label: 'Examples',
    path: '/extensions-demo',
    icon: React.createElement(SettingOutlined),
  },
];
