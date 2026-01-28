/**
 * Base formatDate function (extensible).
 * Override by creating app/extensions/utils/formatDate.ts
 */

import { registry, createRegistryKey } from '../registry';

export type FormatDateFn = (date: Date | string, format?: string) => string;

const FORMAT_DATE_KEY = createRegistryKey('utils', 'formatDate');

function baseFormatDate(date: Date | string, _format?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Register base implementation
registry.registerBase(FORMAT_DATE_KEY, baseFormatDate);

export { baseFormatDate };

export async function getFormatDate(): Promise<FormatDateFn> {
  if (registry.hasExtension(FORMAT_DATE_KEY)) {
    return registry.get<FormatDateFn>(FORMAT_DATE_KEY);
  }
  return registry.getBase<FormatDateFn>(FORMAT_DATE_KEY);
}

export function formatDate(date: Date | string, format?: string): string {
  return baseFormatDate(date, format);
}
