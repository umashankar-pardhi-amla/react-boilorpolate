/**
 * Extended components – use these in app for extensible UI.
 * Re-export so app can import from ~/extensions/components or ~/components.
 */

export { Button } from './Button';
export { Card } from './Card';
export { Sidebar } from './Sidebar';
export { Header } from './Header';
export { Menu } from './Menu';
export { Breadcrumb } from './Breadcrumb';
export { PageHeader } from './PageHeader';
export { Content } from './Content';

export type { ExtendedButtonProps as ButtonProps } from './Button';
export type { ExtendedCardProps as CardProps } from './Card';
export type { SidebarProps } from './Sidebar';
export type { HeaderProps } from './Header';
export type { MenuProps, MenuItem } from './Menu';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';
export type { PageHeaderProps } from './PageHeader';
export type { ContentProps } from './Content';
