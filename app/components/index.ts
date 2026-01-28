/**
 * App components – extensible component entry point.
 * Uses extended components when present; fallback to core.
 * Import from ~/components in your routes.
 * 
 * All components wrap Ant Design internally - no direct Ant Design imports needed in routes/pages.
 */

export {
  Button,
  Card,
  Sidebar,
  Header,
  Menu,
  Breadcrumb,
  PageHeader,
  Content,
} from '~/extensions/components';

export type {
  ButtonProps,
  CardProps,
  SidebarProps,
  HeaderProps,
  MenuProps,
  MenuItem,
  BreadcrumbProps,
  BreadcrumbItem,
  PageHeaderProps,
  ContentProps,
} from '~/extensions/components';
