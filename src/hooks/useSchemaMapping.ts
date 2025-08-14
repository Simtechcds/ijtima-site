import { useState, useEffect } from 'react';
import { useBaserowConfig } from './useBaserowConfig';

interface FieldSchema {
  id: number;
  name: string;
  type: string;
  primary: boolean;
}

interface TableSchema {
  [tableId: string]: FieldSchema[];
}

const BASEROW_TOKEN = 'eaoPQeXBFEeZO2YPWrN20FRm5WJVlonF';
const SCHEMA_CACHE_KEY = 'baserow_schemas';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useSchemaMapping() {
  const [schemas, setSchemas] = useState<TableSchema>({});
  const [loading, setLoading] = useState(false);
  const { config } = useBaserowConfig();

  useEffect(() => {
    async function fetchSchemas() {
      if (!config.length) return;

      // Check cache first
      const cached = localStorage.getItem(SCHEMA_CACHE_KEY);
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          const now = Date.now();
          if (now - cachedData.timestamp < CACHE_DURATION) {
            setSchemas(cachedData.schemas);
            return;
          }
        } catch (error) {
          console.warn('Failed to parse cached schemas:', error);
        }
      }

      setLoading(true);
      const newSchemas: TableSchema = {};

      try {
        // Fetch schemas for all configured tables
        const schemaPromises = config
          .filter(item => item.api_fields_url)
          .map(async (item) => {
            try {
              const response = await fetch(item.api_fields_url, {
                headers: { 'Authorization': `Token ${BASEROW_TOKEN}` }
              });
              
              if (response.ok) {
                const fields: FieldSchema[] = await response.json();
                newSchemas[item.baserow_id] = fields;
              }
            } catch (error) {
              console.warn(`Failed to fetch schema for ${item.category}:`, error);
            }
          });

        await Promise.all(schemaPromises);

        // Cache the schemas
        localStorage.setItem(SCHEMA_CACHE_KEY, JSON.stringify({
          schemas: newSchemas,
          timestamp: Date.now()
        }));

        setSchemas(newSchemas);
      } catch (error) {
        console.error('Error fetching schemas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchemas();
  }, [config]);

  const mapRowData = (row: any, tableId: string) => {
    const schema = schemas[tableId];
    if (!schema) return row;

    // Create a mapping of common field types
    const mapping: any = { id: row.id };
    
    schema.forEach(field => {
      const fieldName = field.name;
      const fieldValue = row[fieldName];
      
      // Map common field patterns
      if (fieldName.toLowerCase().includes('year')) {
        mapping.year = fieldValue;
      } else if (fieldName.toLowerCase().includes('city')) {
        mapping.city = fieldValue;
      } else if (fieldName.toLowerCase().includes('region')) {
        mapping.region = fieldValue;
      } else if (fieldName.toLowerCase().includes('title')) {
        mapping.title = fieldValue;
      } else if (fieldName.toLowerCase().includes('iframe') || fieldName.toLowerCase().includes('url')) {
        mapping.iframeUrl = fieldValue;
      } else if (fieldName.toLowerCase().includes('name')) {
        mapping.name = fieldValue;
      } else if (fieldName.toLowerCase().includes('location')) {
        mapping.location = fieldValue;
      } else if (fieldName.toLowerCase().includes('event')) {
        mapping.event = fieldValue;
      }
      
      // Keep original field name as well
      mapping[fieldName] = fieldValue;
    });

    return mapping;
  };

  return { schemas, loading, mapRowData };
}
