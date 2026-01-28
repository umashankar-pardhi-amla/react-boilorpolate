/**
 * Base PageHeader Component – wraps Ant Design PageHeader.
 * Extend by creating app/extensions/components/PageHeader.tsx
 */

import React from 'react';
import { PageHeader as AntPageHeader } from 'antd';
import type { PageHeaderProps as AntPageHeaderProps } from 'antd';

export interface PageHeaderProps extends AntPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  breadcrumb,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <AntPageHeader
      title={title}
      subTitle={subtitle}
      extra={actions}
      breadcrumb={breadcrumb}
      className={`base-page-header ${className ?? ''}`.trim()}
      {...props}
    />
  );
}
