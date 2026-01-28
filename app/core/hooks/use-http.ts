/**
 * HTTP Hook
 * 
 * Provides access to HTTP client
 */

import { useEffect, useState } from 'react';
import { getHttpClient } from '../http';
import type { BaseHttpClient } from '../http';

export function useHttp() {
  const [httpClient, setHttpClient] = useState<BaseHttpClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const client = await getHttpClient();
      setHttpClient(client);
      setIsLoading(false);
    }
    load();
  }, []);

  return { httpClient, isLoading };
}
