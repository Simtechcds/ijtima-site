import { useState, useEffect } from 'react';
import { useBaserowConfig } from './useBaserowConfig';
import { useSchemaMapping } from './useSchemaMapping';
import { useDataCache } from './useDataCache';

interface SouthAfricaEvent {
  id: string;
  title: string;
  year?: string;
  city?: string;
  location?: string;
  region?: string;
  iframeUrl?: string;
  audioUrl?: string;
  category: string;
  iframeHtml?: string;
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

// South Africa data categories mapping with configuration patterns
const SOUTH_AFRICA_CATEGORIES = {
  'Gauteng': ['Gauteng'],
  'KZN': ['KZN'],
  'Cape': ['Cape'],
  'Old Workers': ['OWJ']
} as const;

export function useSouthAfricaData(category: keyof typeof SOUTH_AFRICA_CATEGORIES) {
  const [events, setEvents] = useState<SouthAfricaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { config, loading: configLoading } = useBaserowConfig();
  const { mapRowData, schemas } = useSchemaMapping();

  // Enhanced caching with data cache hook
  const fetchDataFunction = async () => {
    if (configLoading) throw new Error('Configuration still loading');
    
    // Debug logging
    console.log('useSouthAfricaData - Category:', category);
    console.log('useSouthAfricaData - Available config:', config.map(c => c.category));
    console.log('useSouthAfricaData - Search patterns:', SOUTH_AFRICA_CATEGORIES[category]);
    
    // Find configuration for this category
    const searchPatterns = SOUTH_AFRICA_CATEGORIES[category];
    let configItem = null;
    
    for (const pattern of searchPatterns) {
      configItem = config.find(item => 
        item.category === pattern && 
        (item.Status === 'active' || item.Status === 'Active')
      );
      console.log(`useSouthAfricaData - Checking pattern "${pattern}":`, configItem ? 'FOUND' : 'NOT FOUND');
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
    const transformedEvents: SouthAfricaEvent[] = data.results.map(row => {
      const mappedData = mapRowData(row, configItem!.baserow_id);
      
      // Extract iframe/audio URLs from standardized field names
      const iframeUrl = mappedData['iFrames URL'] || 
                       mappedData.iframeUrl || 
                       mappedData.iframe_url || 
                       mappedData.iframe;

      const audioUrl = mappedData.audioUrl || 
                      mappedData.audio_url || 
                      mappedData.audio || 
                      mappedData.Audio;

      // Create iframe HTML if we have a URL
      let iframeHtml = '';
      if (iframeUrl) {
        if (iframeUrl.includes('spreaker.com')) {
          iframeHtml = `<iframe src="${iframeUrl}" width="100%" height="350" frameborder="0" allowfullscreen></iframe>`;
        } else if (iframeUrl.includes('youtube.com') || iframeUrl.includes('youtu.be')) {
          // Extract YouTube ID and create embed URL
          const videoId = iframeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
          if (videoId) {
            iframeHtml = `<iframe src="https://www.youtube.com/embed/${videoId}" width="100%" height="350" frameborder="0" allowfullscreen></iframe>`;
          }
        } else {
          iframeHtml = `<iframe src="${iframeUrl}" width="100%" height="350" frameborder="0" allowfullscreen></iframe>`;
        }
      }

      return {
        id: row.id.toString(),
        title: mappedData.title || mappedData.name || mappedData.Title || mappedData.Name || `${category} Event ${row.id}`,
        year: mappedData.Year || mappedData.year,
        city: mappedData.City || mappedData.city,
        location: mappedData.location || mappedData.Location,
        region: mappedData.Region || mappedData.region,
        iframeUrl: iframeUrl,
        audioUrl: audioUrl,
        iframeHtml: iframeHtml,
        category: category,
        rawData: mappedData
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
      key: `south_africa_${category}`,
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

// Static fallback data for development/testing
export const getStaticSouthAfricaData = (category: keyof typeof SOUTH_AFRICA_CATEGORIES): string[] => {
  const staticData = {
    'Gauteng': [
      "2000 Benoni", "2001 Lenasia", "2002 Laudium", "2003 Maraisburg", "2004 Nelspruit",
      "2005 Brits", "2006 Pietersburg", "2007 Mayfair", "2008 Lenasia", "2009 Roshnee",
      "2010 Benoni", "2011 Laudium", "2012 Azaadville", "2013 Mia's Farm", "2014 Lenasia",
      "2015 Roshnee", "2016 Benoni", "2017 Laudium", "2018 Rustenburg", "2019 Mia's Farm",
      "2023 Azaadville", "2024 Lenasia", "2025 Johannesburg"
    ],
    'KZN': [
      "2000 Ladysmith", "2001 Verulam", "2002 Estcourt", "2003 Reservoir Hills", "2004 PMB",
      "2005 Stanger", "2006 Chatsworth", "2007 Reservoir Hills", "2008 Masjid Al Hilal (DBN)",
      "2009 Port Shepstone", "2010 Phoenix", "2012 Newcastle", "2013 Overport", "2014 Isipingo Beach",
      "2015 Stanger", "2016 Ladysmith", "2017 Overport", "2018 PMB", "2019 Estcourt",
      "2023 Newlands", "2024 Newcastle", "2025 Overport"
    ],
    'Cape': [
      "2008 Cape Town (WC)", "2011 Port Elizabeth (EC)"
    ],
    'Old Workers': [
      "1998 Azaadville (GP)", "2000 Madressah Zakariyya (GP)", "2001 Camperdown (KZN)",
      "2002 Epping – Cape Town (WP)", "2003 Azaadville (KZN)", "2004 Isipingo Beach (KZN)",
      "2005 Cape Town (WC)", "2006 Johannesburg (GP)", "2007 Reservoir Hills (KZN)",
      "2008 Cape Town (WC)", "2008 Durban (KZN)", "2008 Johannesburg (GP)", "2009 Port Elizabeth (EC)",
      "2010 Masjid un Noor (GP)", "2011 Phoenix Industrial (KZN)", "2012 Cape Town (WC)",
      "2013 Lenasia (GP)", "2014 Mt Edgecombe (KZN)", "2015 Cape Town (WC)", "2016 Benoni (GP)",
      "2017 Laudium (GP)", "2018 Ladysmith (KZN)", "2019 Lenasia (GP)", "2022 Shakaskraal (KZN)",
      "2023 Ormonde (GP)", "2024 La Mercy (KZN)", "2025 Masjid un Noor (GP)"
    ]
  };

  return staticData[category] || [];
};