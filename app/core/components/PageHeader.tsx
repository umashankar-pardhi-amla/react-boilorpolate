/**
 * Base PageHeader Component – wraps Ant Design PageHeader.
 * Extend by creating app/extensions/components/PageHeader.tsx
 */

import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div className={`base-page-header mb-6 ${className ?? ''}`.trim()}>
      {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="!mb-1">
            {title}
          </Title>
          {subtitle && <Text type="secondary">{subtitle}</Text>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
