import { useState, useEffect } from 'react';
import { SearchItem } from '@/data/searchData';

interface BaserowRow {
  id: number;
  Year?: string;
  City?: string;
  Region?: string;
  'iframe URL'?: string;
}

interface BaserowResponse {
  count: number;
  next?: string;
  previous?: string;
  results: BaserowRow[];
}

// For development - replace with actual API token when ready
const BASEROW_API_TOKEN = 'your_api_token_here';
const BASEROW_TABLE_ID = '641352'; // NATIONAL table ID
const BASEROW_API_URL = `https://api.baserow.io/api/database/rows/table/${BASEROW_TABLE_ID}/`;

export function useBaserowNationalData() {
  const [data, setData] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBaserowData() {
      try {
        setLoading(true);
        setError(null);
        
        // For now, return empty array since we need API token
        if (BASEROW_API_TOKEN === 'your_api_token_here') {
          setData([]);
          setLoading(false);
          return;
        }

        const response = await fetch(BASEROW_API_URL, {
          headers: {
            'Authorization': `Token ${BASEROW_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Baserow API error: ${response.status}`);
        }

        const baserowData: BaserowResponse = await response.json();
        
        // Transform Baserow data to SearchItem format
        const transformedData: SearchItem[] = baserowData.results
          .filter(row => row.Year && row.City) // Only include rows with required data
          .map(row => ({
            title: `${row.Year} ${row.City}${row.Region ? ` (${row.Region})` : ''}`,
            category: 'South Africa',
            location: 'South Africa',
            type: 'National' as const,
            baserowId: row.id,
            iframeUrl: row['iframe URL'],
          }));

        setData(transformedData);
      } catch (err) {
        console.error('Error fetching Baserow data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchBaserowData();
  }, []);

  return { data, loading, error };
}