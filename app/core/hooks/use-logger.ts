/**
 * Logger Hook
 * 
 * Provides access to logger instance
 */

import { useEffect, useState } from 'react';
import { getLogger } from '../logger';
import type { BaseLogger } from '../logger';

export function useLogger() {
  const [logger, setLogger] = useState<BaseLogger | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const loggerInstance = await getLogger();
      setLogger(loggerInstance);
      setIsLoading(false);
    }
    load();
  }, []);

  return { logger, isLoading };
}
