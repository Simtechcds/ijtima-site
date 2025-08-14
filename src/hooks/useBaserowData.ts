import { useState, useEffect } from 'react';
import { SearchItem } from '@/data/searchData';
import { useBaserowConfig } from './useBaserowConfig';
import { useSchemaMapping } from './useSchemaMapping';

interface BaserowRow {
  id: number;
  Year?: string;
  City?: string;
  Region?: string;
  iframe_url?: string;
  [key: string]: any;
}

interface BaserowResponse {
  count: number;
  next?: string;
  previous?: string;
  results: BaserowRow[];
}

interface NationalEvent {
  id: number;
  year: string;
  city: string;
  region?: string;
  iframeHtml?: string;
}

const BASEROW_TOKEN = 'eaoPQeXBFEeZO2YPWrN20FRm5WJVlonF';

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CachedData {
  data: SearchItem[];
  timestamp: number;
}

function getCacheKey(category: string, subcategory?: string): string {
  return `baserow_data_${category}${subcategory ? `_${subcategory}` : ''}`;
}

// Universal hook for any Baserow data source
export function useBaserowData(category: string, subcategory?: string) {
  const [data, setData] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getApiUrl, getTableId, loading: configLoading } = useBaserowConfig();
  const { mapRowData } = useSchemaMapping();

  const fetchData = async () => {
    // Wait for config to load
    if (configLoading) return;
    
    const cacheKey = getCacheKey(category, subcategory);
    
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData: CachedData = JSON.parse(cached);
        const now = Date.now();
        
        // Use cached data if it's still fresh
        if (now - cachedData.timestamp < CACHE_DURATION) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }
      }
      
      const apiUrl = getApiUrl(category, subcategory);
      if (!apiUrl) {
        // If no API URL but we have cached data, use it
        if (cached) {
          const cachedData: CachedData = JSON.parse(cached);
          setData(cachedData.data);
          setLoading(false);
          return;
        }
        setError(`No API URL found for ${category}${subcategory ? `-${subcategory}` : ''}`);
        setLoading(false);
        return;
      }
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`
        }
      });

      if (!response.ok) {
        // If API fails but we have cached data, use it
        if (cached) {
          const cachedData: CachedData = JSON.parse(cached);
          setData(cachedData.data);
          setLoading(false);
          return;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const baserowData: BaserowResponse = await response.json();
      const tableId = getTableId(category, subcategory);
      
      // Transform to SearchItem format with proper schema mapping
      const transformedData: SearchItem[] = baserowData.results
        .map(row => {
          const mappedRow = tableId ? mapRowData(row, tableId) : row;
          
          // Use mapped fields with fallbacks
          const year = mappedRow.year || mappedRow.Year || '';
          const city = mappedRow.city || mappedRow.City || mappedRow.name || mappedRow.title || '';
          const region = mappedRow.region || mappedRow.Region || '';
          const iframeUrl = mappedRow.iframeUrl || mappedRow.iframe_url || mappedRow['iFrames URL'] || '';
          
          // Only include items that have at least a year or city
          if (!year && !city) return null;
          
          return {
            title: `${year} ${city}${region ? ` (${region})` : ''}`.trim(),
            category: category,
            location: category === 'South Africa' ? 'South Africa' : 'International',
            type: (subcategory || category) as any,
            baserowId: row.id,
            iframeUrl: iframeUrl,
          };
        })
        .filter(Boolean) as SearchItem[];

      // Cache the fresh data
      localStorage.setItem(cacheKey, JSON.stringify({
        data: transformedData,
        timestamp: Date.now()
      }));

      setData(transformedData);
    } catch (err) {
      console.error(`Error fetching ${category} data:`, err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      
      // Try to use cached data as fallback
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData: CachedData = JSON.parse(cached);
        setData(cachedData.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, subcategory, configLoading]);

  // Manual refresh function
  const refresh = async () => {
    const cacheKey = getCacheKey(category, subcategory);
    localStorage.removeItem(cacheKey);
    await fetchData();
  };

  return { data, loading, error, refresh };
}

// Specialized hook for National events (maintains compatibility)
export function useBaserowNationalEvents() {
  const [events, setEvents] = useState<NationalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getApiUrl, loading: configLoading } = useBaserowConfig();
  const { mapRowData } = useSchemaMapping();

  const fetchNationalEvents = async () => {
    if (configLoading) return;
    
    const cacheKey = 'baserow_national_events';
    
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        const now = Date.now();
        
        // Use cached data if it's still fresh
        if (now - cachedData.timestamp < CACHE_DURATION) {
          setEvents(cachedData.data);
          setLoading(false);
          return;
        }
      }
      
      // Try to get URL from config, fallback to hardcoded
      let apiUrl = getApiUrl('South Africa', 'National');
      if (!apiUrl) {
        // Fallback to existing hardcoded URL
        apiUrl = 'https://api.baserow.io/api/database/rows/table/641352/?user_field_names=true';
      }
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`
        }
      });

      if (!response.ok) {
        // If API fails but we have cached data, use it
        if (cached) {
          const cachedData = JSON.parse(cached);
          setEvents(cachedData.data);
          setLoading(false);
          return;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const baserowData: BaserowResponse = await response.json();
      
      const transformedEvents: NationalEvent[] = baserowData.results
        .map(row => {
          const mappedRow = mapRowData(row, '641352'); // National events table ID
          
          const year = mappedRow.year || mappedRow.Year || '';
          const city = mappedRow.city || mappedRow.City || '';
          const region = mappedRow.region || mappedRow.Region || '';
          const iframeHtml = mappedRow.iframeUrl || mappedRow.iframe_url || mappedRow['iFrames URL'] || '';
          
          if (!year && !city) return null;
          
          return {
            id: row.id,
            year,
            city,
            region,
            iframeHtml,
          };
        })
        .filter(Boolean) as NationalEvent[]
        .sort((a, b) => parseInt(a.year) - parseInt(b.year));

      // Cache the fresh data
      localStorage.setItem(cacheKey, JSON.stringify({
        data: transformedEvents,
        timestamp: Date.now()
      }));

      setEvents(transformedEvents);
    } catch (err) {
      console.error('Error fetching National events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      
      // Try to use cached data as fallback
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        setEvents(cachedData.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNationalEvents();
  }, [configLoading]);

  // Manual refresh function
  const refresh = async () => {
    localStorage.removeItem('baserow_national_events');
    await fetchNationalEvents();
  };

  return { events, loading, error, refresh };
}

// Legacy hook for backward compatibility
export function useBaserowNationalData() {
  const { data, loading, error } = useBaserowData('South Africa', 'National');
  return { data, loading, error };
}