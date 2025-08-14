import { useState, useEffect } from 'react';
import { useBaserowConfig } from './useBaserowConfig';

interface InternationalEvent {
  id: number;
  title: string;
  year?: string;
  location?: string;
  category: string;
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

// International data categories mapping
const INTERNATIONAL_CATEGORIES = {
  'Raiwind': 'International-Raiwind',
  'Tongi': 'International-Tongi', 
  'Nizamuddin': 'International-Nizamuddin',
  'UK': 'International-UK',
  'Canada': 'International-Canada',
  'India': 'International-India',
  'Other': 'International-Other'
} as const;

export function useInternationalData(category: keyof typeof INTERNATIONAL_CATEGORIES) {
  const [events, setEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getApiUrl, getTableId, loading: configLoading } = useBaserowConfig();

  const fetchInternationalData = async () => {
    if (configLoading) return;
    
    const configCategory = INTERNATIONAL_CATEGORIES[category];
    const apiUrl = getApiUrl('International', category);
    
    if (!apiUrl) {
      // Fallback to static data if no API configured
      const staticData = getStaticData(category);
      setEvents(staticData);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Token ${BASEROW_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const baserowData: BaserowResponse = await response.json();
      
      // Transform data to string array (maintain compatibility)
      const transformedEvents: string[] = baserowData.results
        .map(row => {
          // Try multiple field patterns for event titles
          const title = row.Title || row.title || row.Name || row.name || 
                       row.Event || row.event || row.Location || row.location ||
                       row.City || row.city || row.Year || row.year || '';
          
          const year = row.Year || row.year || '';
          const city = row.City || row.city || '';
          
          // Create meaningful title
          if (year && city) {
            return `${year} ${city}`;
          } else if (title) {
            return title;
          } else {
            return `Event ${row.id}`;
          }
        })
        .filter(Boolean);

      setEvents(transformedEvents);
    } catch (err) {
      console.error(`Error fetching ${category} data:`, err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      
      // Fallback to static data on error
      const staticData = getStaticData(category);
      setEvents(staticData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternationalData();
  }, [category, getApiUrl, getTableId, configLoading]);

  // Manual refresh function
  const refresh = async () => {
    await fetchInternationalData();
  };

  return { events, loading, error, refresh };
}

// Fallback static data
function getStaticData(category: keyof typeof INTERNATIONAL_CATEGORIES): string[] {
  const staticData = {
    'Raiwind': [
      "1976 - First Ijtema",
      "1977 - Second Ijtema", 
      "1995 - 20th Anniversary",
      "2000 - Millennium Ijtema",
      "2010 - 35th Anniversary",
      "2020 - Virtual Ijtema"
    ],
    'Tongi': [
      "1967 - First Ijtema",
      "1975 - Expansion Period",
      "1990 - Major Growth",
      "2000 - International Recognition",
      "2010 - Record Attendance",
      "2020 - Digital Transformation"
    ],
    'Nizamuddin': [
      "1926 - Foundation",
      "1947 - Post-Independence",
      "1960 - Global Expansion",
      "1980 - Modern Era",
      "2000 - Digital Age",
      "2020 - Contemporary Period"
    ],
    'UK': [
      "1982 - First UK Ijtema",
      "1990 - Dewsbury Establishment",
      "2000 - Millennium Gathering",
      "2010 - 30th Anniversary",
      "2020 - Virtual Format"
    ],
    'Canada': [
      "1985 - First Canadian Ijtema",
      "1995 - Toronto Expansion",
      "2005 - National Growth",
      "2015 - Digital Integration",
      "2020 - Virtual Adaptation"
    ],
    'India': [
      "1946 - Early Gatherings",
      "1960 - Regional Expansions", 
      "1980 - State-wise Organization",
      "2000 - Modern Infrastructure",
      "2020 - Digital Transformation"
    ],
    'Other': [
      "USA - Annual Ijtemas",
      "Australia - Regional Events",
      "South Africa - Local Gatherings",
      "Europe - Continental Meetings",
      "Gulf States - Regional Events"
    ]
  };

  return staticData[category] || [];
}