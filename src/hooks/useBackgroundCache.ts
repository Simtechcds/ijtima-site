import { useState, useEffect } from 'react';

const CACHE_KEY = 'ijtima:cached_backgrounds';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedImage {
  url: string;
  blob: string;
  timestamp: number;
}

interface CachedImages {
  [url: string]: CachedImage;
}

export function useBackgroundCache() {
  const [cachedImages, setCachedImages] = useState<CachedImages>({});

  // Load cached images on mount
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const data: CachedImages = JSON.parse(cached);
        setCachedImages(data);
      } catch (error) {
        console.warn('Failed to parse cached images:', error);
      }
    }
  }, []);

  const getCachedImage = async (url: string): Promise<string> => {
    // Check if we have a cached version
    const cached = cachedImages[url];
    const now = Date.now();

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return cached.blob;
    }

    try {
      // Fetch and cache the image
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const newCached = {
        url,
        blob: dataUrl,
        timestamp: now
      };

      const updatedCache = {
        ...cachedImages,
        [url]: newCached
      };

      setCachedImages(updatedCache);
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));

      return dataUrl;
    } catch (error) {
      console.warn('Failed to cache image:', error);
      return url; // Fallback to original URL
    }
  };

  const clearCache = () => {
    setCachedImages({});
    localStorage.removeItem(CACHE_KEY);
  };

  return { getCachedImage, clearCache };
}