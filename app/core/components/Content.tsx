/**
 * Base Content Component – wraps Ant Design Layout.Content.
 * Extend by creating app/extensions/components/Content.tsx
 */

import React from 'react';
import { Layout } from 'antd';
import type { ContentProps } from 'antd/es/layout';

const { Content: AntContent } = Layout;

export interface ContentComponentProps extends ContentProps {
  children: React.ReactNode;
}

export function Content({ children, className, ...props }: ContentComponentProps) {
  return (
    <AntContent
      className={`base-content p-6 ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </AntContent>
  );
}
