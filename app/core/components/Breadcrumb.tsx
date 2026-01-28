/**
 * Base Breadcrumb Component – wraps Ant Design Breadcrumb.
 * Extend by creating app/extensions/components/Breadcrumb.tsx
 */

import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import type { BreadcrumbProps as AntBreadcrumbProps } from 'antd';
import { Link } from 'react-router';

export interface BreadcrumbItem {
  title: string;
  path?: string;
  href?: string;
}

export interface BreadcrumbProps extends Omit<AntBreadcrumbProps, 'items'> {
  items?: BreadcrumbItem[];
}

export function Breadcrumb({ items = [], ...props }: BreadcrumbProps) {
  const breadcrumbItems = items.map((item) => ({
    title: item.path ? (
      <Link to={item.path}>{item.title}</Link>
    ) : item.href ? (
      <a href={item.href}>{item.title}</a>
    ) : (
      item.title
    ),
  }));

  return <AntBreadcrumb items={breadcrumbItems} {...props} />;
}
