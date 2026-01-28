/**
 * Base Header Component – wraps Ant Design Layout.Header.
 * Extend by creating app/extensions/components/Header.tsx
 */

import React from 'react';
import { Layout } from 'antd';
import type { HeaderProps as AntHeaderProps } from 'antd/es/layout';

const { Header: AntHeader } = Layout;

export interface HeaderProps extends AntHeaderProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  title?: string;
}

export function Header({
  leftContent,
  rightContent,
  title,
  className,
  ...props
}: HeaderProps) {
  return (
    <AntHeader
      className={`base-header flex items-center justify-between px-6 ${className ?? ''}`.trim()}
      {...props}
    >
      <div className="flex items-center gap-4">
        {leftContent}
        {title && <h1 className="text-lg font-semibold m-0">{title}</h1>}
      </div>
      {rightContent && <div className="flex items-center gap-4">{rightContent}</div>}
    </AntHeader>
  );
}
