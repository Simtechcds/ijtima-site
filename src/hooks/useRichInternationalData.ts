import { useState, useEffect } from 'react';
import { useBaserowConfig } from './useBaserowConfig';
import { useSchemaMapping } from './useSchemaMapping';

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
  'Other': ['International-Other', 'Other']
} as const;

export function useRichInternationalData(category: keyof typeof INTERNATIONAL_CATEGORIES) {
  const [events, setEvents] = useState<RichInternationalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { config, loading: configLoading } = useBaserowConfig();
  const { mapRowData, schemas } = useSchemaMapping();

  const fetchRichInternationalData = async () => {
    if (configLoading) return;
    
    try {
      setLoading(true);
      setError(null);
      setIsPending(false);
      
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
      
      console.log(`[RichInternationalData] Category: ${category}, Config found:`, configItem);
      
      if (!configItem) {
        // Check if there's an inactive/pending entry
        const pendingItem = config.find(item => 
          searchPatterns.some(pattern => item.category === pattern)
        );
        
        if (pendingItem) {
          console.log(`[RichInternationalData] Found pending/inactive entry for ${category}`);
          setIsPending(true);
          setEvents([]);
          setLoading(false);
          return;
        }
        
        throw new Error(`No configuration found for ${category}`);
      }

      if (!configItem.api_rows_url) {
        console.log(`[RichInternationalData] No API URL for ${category} - marking as pending`);
        setIsPending(true);
        setEvents([]);
        setLoading(false);
        return;
      }

      // Fetch data from API
      const response = await fetch(configItem.api_rows_url, {
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const baserowData: BaserowResponse = await response.json();
      console.log(`[RichInternationalData] Raw API response for ${category}:`, baserowData);
      
      if (!baserowData.results || baserowData.results.length === 0) {
        console.log(`[RichInternationalData] No data found for ${category} - marking as pending`);
        setIsPending(true);
        setEvents([]);
        setLoading(false);
        return;
      }

      // Transform data using schema mapping
      const transformedEvents: RichInternationalEvent[] = baserowData.results.map(row => {
        const mappedData = mapRowData(row, configItem.baserow_id);
        console.log(`[RichInternationalData] Mapped row for ${category}:`, mappedData);
        
        // Extract iframe/audio URLs from various possible field names
        const iframeUrl = mappedData.iframeUrl || 
                         mappedData.iframe_url || 
                         mappedData.iframe || 
                         mappedData.url || 
                         mappedData.link || 
                         mappedData.audio_url ||
                         mappedData.audio ||
                         mappedData.Audio ||
                         mappedData.URL ||
                         mappedData.Link ||
                         mappedData.Iframe;

        const audioUrl = mappedData.audioUrl || 
                        mappedData.audio_url || 
                        mappedData.audio || 
                        mappedData.Audio;

        return {
          id: row.id,
          title: mappedData.title || mappedData.name || mappedData.Title || mappedData.Name || `${category} Event ${row.id}`,
          year: mappedData.year || mappedData.Year,
          location: mappedData.location || mappedData.Location,
          city: mappedData.city || mappedData.City,
          region: mappedData.region || mappedData.Region,
          iframeUrl: iframeUrl,
          audioUrl: audioUrl,
          category: category,
          rawData: mappedData
        };
      });

      console.log(`[RichInternationalData] Final transformed events for ${category}:`, transformedEvents);
      setEvents(transformedEvents);
      
    } catch (err) {
      console.error(`[RichInternationalData] Error fetching ${category} data:`, err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRichInternationalData();
  }, [category, config, configLoading]);

  // Manual refresh function
  const refresh = async () => {
    await fetchRichInternationalData();
  };

  return { events, loading, error, isPending, refresh };
}