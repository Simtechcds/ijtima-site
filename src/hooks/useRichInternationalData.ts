import { useState, useEffect } from 'react';
import { useBaserowConfig } from './useBaserowConfig';
import { useSchemaMapping } from './useSchemaMapping';
import { useDataCache } from './useDataCache';

export interface RichInternationalEvent {
  id: number;
  title: string;
  year?: string;
  location?: string;
  city?: string;
  region?: string;
  iframeUrl?: string;
  audioUrl?: string;
  category: string;
  rawData?: any;
}

interface BaserowRow {
  id: number;
  [key: string]: any;
}

interface BaserowResponse {
  count: number;
  next?: string;
  previous?: string;
  results: BaserowRow[];
}

const BASEROW_TOKEN = 'eaoPQeXBFEeZO2YPWrN20FRm5WJVlonF';

// International data categories mapping with configuration patterns
const INTERNATIONAL_CATEGORIES = {
  'Raiwind': ['International-Raiwind', 'Raiwind'],
  'Tongi': ['International-Tongi', 'Tongi'], 
  'Nizamuddin': ['International-Nizamuddin', 'Nizamuddin'],
  'UK': ['International-UK', 'UK'],
  'Canada': ['International-Canada', 'Canada'],
  'India': ['International-India', 'India'],
  'Other': ['International-Other', 'Other'],
  'Gauteng': ['South Africa-Gauteng', 'Gauteng'],
  'KZN': ['South Africa-KZN', 'KZN'],
  'Cape': ['South Africa-Cape', 'Cape'],
  'Old Worlders': ['South Africa-Old Worlders', 'Old Worlders']
} as const;

export function useRichInternationalData(category: keyof typeof INTERNATIONAL_CATEGORIES) {
  const [events, setEvents] = useState<RichInternationalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { config, loading: configLoading } = useBaserowConfig();
  const { mapRowData, schemas } = useSchemaMapping();

  // Enhanced caching with data cache hook
  const fetchDataFunction = async () => {
    if (configLoading) throw new Error('Configuration still loading');
    
    // Find configuration for this category
    const searchPatterns = INTERNATIONAL_CATEGORIES[category];
    let configItem = null;
    
    for (const pattern of searchPatterns) {
      configItem = config.find(item => 
        item.category === pattern && 
        (item.Status === 'active' || item.Status === 'Active')
      );
      if (configItem) break;
    }

    if (!configItem) {
      throw new Error(`No configuration found for ${category}`);
    }

    if (!configItem.api_rows_url) {
      throw new Error(`No API URL configured for ${category}`);
    }

    // Fetch data from Baserow
    const response = await fetch(configItem.api_rows_url, {
      headers: { 'Authorization': `Token ${BASEROW_TOKEN}` }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: BaserowResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    // Transform the data using schema mapping
    const transformedEvents: RichInternationalEvent[] = data.results.map(row => {
      const mappedData = mapRowData(row, configItem!.baserow_id);
      
      return {
        id: mappedData.id,
        title: mappedData.title || mappedData.name || `${category} Event`,
        year: mappedData.year,
        location: mappedData.location,
        region: mappedData.region,
        iframeUrl: mappedData.iframeUrl,
        audioUrl: mappedData.audioUrl,
        category: category,
        ...mappedData
      };
    });

    return transformedEvents;
  };

  const {
    data: cachedEvents,
    loading: cacheLoading,
    error: cacheError,
    refresh: refreshCache
  } = useDataCache(
    fetchDataFunction,
    {
      key: `international_${category}`,
      duration: 30 * 60 * 1000 // 30 minutes cache
    },
    [category, config, configLoading]
  );

  // Update state based on cache results
  useEffect(() => {
    if (cachedEvents) {
      setEvents(cachedEvents);
      setIsPending(cachedEvents.length === 0);
    }
    setLoading(cacheLoading);
    setError(cacheError);
  }, [cachedEvents, cacheLoading, cacheError]);

  // Manual refresh function  
  const refresh = async () => {
    await refreshCache();
  };

  return { events, loading, error, isPending, refresh };
}