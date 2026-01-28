/**
 * Extended Button – extensible component example.
 * Wraps base Button with extra styling and analytics. Use via ~/components.
 */

import { Button as BaseButton } from '~/core/components';
import type { ButtonProps } from '~/core/components';
import type { ReactNode } from 'react';

export interface ExtendedButtonProps extends ButtonProps {
  children: ReactNode;
  trackClick?: boolean;
}

export function Button({ children, trackClick = true, onClick, ...props }: ExtendedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackClick && typeof window !== 'undefined' && (window as unknown as { __trackClick?: (label: string) => void }).__trackClick) {
      (window as unknown as { __trackClick: (label: string) => void }).__trackClick(String(children));
    }
    onClick?.(e);
  };

  return (
    <BaseButton
      {...props}
      onClick={handleClick}
      className={`ext-button ${props.className ?? ''}`.trim()}
    >
      {children}
    </BaseButton>
  );
}
