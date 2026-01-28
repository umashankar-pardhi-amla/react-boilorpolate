/**
 * Base Button Component
 * 
 * Extend by creating app/extensions/components/Button.tsx
 */

import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import type { ReactNode } from 'react';

export interface ButtonProps extends AntButtonProps {
  children: ReactNode;
}

/**
 * Base Button Component
 * Can be overridden by creating app/extensions/components/Button.tsx
 */
export function Button({ children, ...props }: ButtonProps) {
  return <AntButton {...props}>{children}</AntButton>;
}
