/**
 * Extended Card – extensible component example.
 * Base comes from Ant Design; this adds app-specific styling and optional header action.
 */

import { Card as AntCard } from 'antd';
import type { CardProps } from 'antd';
import type { ReactNode } from 'react';

export interface ExtendedCardProps extends CardProps {
  children: ReactNode;
  headerAction?: ReactNode;
}

export function Card({ title, headerAction, children, className, ...props }: ExtendedCardProps) {
  const header = title || headerAction ? (
    <div className="flex items-center justify-between gap-2">
      {title && <span className="font-semibold">{title}</span>}
      {headerAction}
    </div>
  ) : undefined;

  return (
    <AntCard
      title={header}
      className={`ext-card shadow-md rounded-lg ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </AntCard>
  );
}
