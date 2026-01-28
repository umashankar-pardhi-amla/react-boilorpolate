/**
 * Extended formatDate – extensible function example.
 * Uses dayjs for custom formats. Overrides base core/utils/formatDate.
 */

import dayjs from 'dayjs';
import type { FormatDateFn } from '~/core/utils/formatDate';

export const formatDate: FormatDateFn = (date: Date | string, format?: string): string => {
  const d = typeof date === 'string' ? dayjs(date) : dayjs(date);
  if (format) {
    return d.format(format);
  }
  return d.format('DD MMM YYYY');
};
