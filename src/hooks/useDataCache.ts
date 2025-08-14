import { useState, useEffect } from 'react';

interface CachedData<T> {
  data: T;
  timestamp: number;
  category: string;
}

interface CacheOptions {
  duration?: number; // in milliseconds
  key: string;
}

const DEFAULT_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useDataCache<T>(
  fetchFunction: () => Promise<T>,
  options: CacheOptions,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { key, duration = DEFAULT_CACHE_DURATION } = options;

  const getCachedData = (): CachedData<T> | null => {
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;
      
      const cachedData: CachedData<T> = JSON.parse(cached);
      const now = Date.now();
      
      if (now - cachedData.timestamp < duration) {
        return cachedData;
      }
      
      // Cache expired, remove it
      localStorage.removeItem(`cache_${key}`);
      return null;
    } catch (error) {
      console.warn(`Failed to parse cached data for ${key}:`, error);
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
  };

  const setCachedData = (newData: T) => {
    try {
      const cacheData: CachedData<T> = {
        data: newData,
        timestamp: Date.now(),
        category: key
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn(`Failed to cache data for ${key}:`, error);
    }
  };

  const fetchData = async (useCache = true) => {
    try {
      setLoading(true);
      setError(null);

      // Try cache first if enabled
      if (useCache) {
        const cached = getCachedData();
        if (cached) {
          setData(cached.data);
          setLoading(false);
          return cached.data;
        }
      }

      // Fetch fresh data
      const freshData = await fetchFunction();
      setData(freshData);
      setCachedData(freshData);
      
      return freshData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Try to use cached data as fallback
      const cached = getCachedData();
      if (cached) {
        setData(cached.data);
        console.warn(`Using cached data due to fetch error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    localStorage.removeItem(`cache_${key}`);
  };

  const refresh = async () => {
    return await fetchData(false); // Skip cache on refresh
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refresh,
    clearCache,
    fetchData
  };
}

// Global cache management
export const DataCacheManager = {
  clearAll: () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  },
  
  clearCategory: (category: string) => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_') && key.includes(category)) {
        localStorage.removeItem(key);
      }
    });
  },
  
  getCacheInfo: () => {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(key => key.startsWith('cache_'));
    
    return cacheKeys.map(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        return {
          key: key.replace('cache_', ''),
          timestamp: data.timestamp,
          age: Date.now() - data.timestamp,
          category: data.category
        };
      } catch {
        return null;
      }
    }).filter(Boolean);
  }
};