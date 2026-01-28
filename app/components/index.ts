/**
 * App components – extensible component entry point.
 * Uses extended components when present; fallback to core.
 * Import from ~/components in your routes.
 */

export { Button, Card } from '~/extensions/components';
export type { ExtendedButtonProps as ButtonProps } from '~/extensions/components';
export type { ExtendedCardProps as CardProps } from '~/extensions/components';
