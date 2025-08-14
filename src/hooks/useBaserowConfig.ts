import { useState, useEffect } from 'react';

interface BaserowConfigItem {
  id: number;
  baserow_id: string;
  category: string;
  api_rows_url: string;
  api_fields_url: string;
  Status: string;
}

interface BaserowConfigResponse {
  count: number;
  next?: string;
  previous?: string;
  results: BaserowConfigItem[];
}

// Configuration table API
const CONFIG_TABLE_ID = '641142';
const CONFIG_API_URL = `https://api.baserow.io/api/database/rows/table/${CONFIG_TABLE_ID}/?user_field_names=true`;
const BASEROW_TOKEN = 'eaoPQeXBFEeZO2YPWrN20FRm5WJVlonF';

export function useBaserowConfig() {
  const [config, setConfig] = useState<BaserowConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(CONFIG_API_URL, {
          headers: {
            'Authorization': `Token ${BASEROW_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error(`Config API error: ${response.status}`);
        }

        const data: BaserowConfigResponse = await response.json();
        
        // Only include active configurations
        const activeConfig = data.results.filter(item => 
          item.Status === 'active' || item.Status === 'Active'
        );
        
        setConfig(activeConfig);
      } catch (err) {
        console.error('Error fetching Baserow config:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch config');
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  // Helper function to get API URL for a specific category
  const getApiUrl = (category: string, subcategory?: string) => {
    const key = subcategory ? `${category}-${subcategory}` : category;
    const configItem = config.find(item => 
      item.category.toLowerCase() === key.toLowerCase() ||
      item.baserow_id === key
    );
    return configItem?.api_rows_url;
  };

  // Helper function to get table ID from URL
  const getTableId = (category: string, subcategory?: string) => {
    const apiUrl = getApiUrl(category, subcategory);
    if (!apiUrl) return null;
    
    const match = apiUrl.match(/table\/(\d+)\//);
    return match ? match[1] : null;
  };

  return { 
    config, 
    loading, 
    error, 
    getApiUrl, 
    getTableId 
  };
}