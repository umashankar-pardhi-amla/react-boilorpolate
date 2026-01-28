/**
 * Base Menu Configuration – default menu items.
 * Override in app/extensions/config/menu.ts
 */

import type { MenuItem } from '../components/Menu';
import { HomeOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';

export const defaultMenuItems: MenuItem[] = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    key: '/home',
    label: 'Home',
    path: '/home',
    icon: <HomeOutlined />,
  },
  {
    key: '/extensions-demo',
    label: 'Examples',
    path: '/extensions-demo',
    icon: <SettingOutlined />,
  },
];
