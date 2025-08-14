import { useState, useEffect } from 'react';
import { SearchItem } from '@/data/searchData';

interface BaserowRow {
  id: number;
  Year?: string;
  City?: string;
  Region?: string;
  'iframe URL'?: string;
  [key: string]: any; // Allow other fields
}

interface NationalEvent {
  id: number;
  year: string;
  city: string;
  region?: string;
  iframeUrl?: string;
}

interface BaserowResponse {
  count: number;
  next?: string;
  previous?: string;
  results: BaserowRow[];
}

// Baserow API configuration for NATIONAL table
const BASEROW_TABLE_ID = '641352'; // NATIONAL table ID
const BASEROW_FIELDS_URL = `https://api.baserow.io/api/database/fields/table/${BASEROW_TABLE_ID}/`;
const BASEROW_ROWS_URL = `https://api.baserow.io/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true`;

export function useBaserowNationalData() {
  const [data, setData] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBaserowData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data directly from Baserow API (no auth required for testing)
        const response = await fetch(BASEROW_ROWS_URL);

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

// New hook specifically for South Africa National events  
export function useBaserowNationalEvents() {
  const [events, setEvents] = useState<NationalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNationalEvents() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(BASEROW_ROWS_URL);

        if (!response.ok) {
          throw new Error(`Baserow API error: ${response.status}`);
        }

        const baserowData: BaserowResponse = await response.json();
        
        // Transform to NationalEvent format
        const transformedEvents: NationalEvent[] = baserowData.results
          .filter(row => row.Year && row.City)
          .map(row => ({
            id: row.id,
            year: row.Year || '',
            city: row.City || '',
            region: row.Region,
            iframeUrl: row['iframe URL'],
          }))
          .sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort by year

        setEvents(transformedEvents);
      } catch (err) {
        console.error('Error fetching National events:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    }

    fetchNationalEvents();
  }, []);

  return { events, loading, error };
}