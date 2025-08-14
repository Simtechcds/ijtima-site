import { useState, useMemo, useCallback, useEffect } from "react";
import Seo from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { searchableItems, locationOptions, type SearchItem } from "@/data/searchData";
import { useBaserowNationalData } from "@/hooks/useBaserowData";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Search = () => {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState<SearchItem | null>(null);
  const [open, setOpen] = useState(false);
  
  // Fetch dynamic Baserow data for National events
  const { data: baserowNationalData, loading: baserowLoading, error: baserowError } = useBaserowNationalData();

  // Debounce search query for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Combine static and dynamic data
  const allItems = useMemo(() => {
    // Replace static national items with dynamic Baserow data when available
    const staticNonNational = searchableItems.filter(item => item.type !== 'National');
    return [...staticNonNational, ...baserowNationalData];
  }, [baserowNationalData]);

  // Filter items based on location selection
  const filteredItems = useMemo(() => {
    let items = allItems;
    
    if (selectedLocation !== "all") {
      const locationMap: Record<string, string[]> = {
        'national': ['National'],
        'gauteng': ['Gauteng'],
        'kzn': ['KZN'],
        'cape': ['Cape'],
        'old-workers': ['Old Workers'],
        'raiwind': ['Raiwind'],
        'tongi': ['Tongi'],
        'nizamuddin-jor': ['Nizamuddin Jor'],
        'india': ['India'],
        'uk': ['UK'],
        'canada': ['Canada'],
      };
      
      const allowedTypes = locationMap[selectedLocation] || [];
      items = items.filter(item => allowedTypes.includes(item.type));
    }
    
    return items;
  }, [selectedLocation, allItems]);

  // Filter items based on debounced search query
  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    
    return filteredItems.filter(item =>
      item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    ).slice(0, 10); // Limit to 10 results
  }, [debouncedSearchQuery, filteredItems]);

  const handleSelectResult = useCallback((item: SearchItem) => {
    setSelectedResult(item);
    setSearchQuery(item.title);
    setOpen(false);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setOpen(true);
    }
  }, []);

  return (
    <main className="space-y-6">
      <Seo title="Search — IJTIMA Collection" description="Search through all Ijtima collections and events." />
      
      <div className="glass-surface p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Location Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                {locationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Bar with Autocomplete */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-background/80 backdrop-blur-sm border-border/50 font-normal"
                >
                  <Input
                    placeholder="Type to search events..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onFocus={() => setOpen(true)}
                  />
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              {searchResults.length > 0 && (
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[400px] p-0 bg-background/95 backdrop-blur-md border-border/50" align="start">
                  <Command>
                    <CommandList className="max-h-64">
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {searchResults.map((item, index) => (
                          <CommandItem
                            key={index}
                            value={item.title}
                            onSelect={() => handleSelectResult(item)}
                            className="cursor-pointer px-4 py-3"
                          >
                            <Check
                              className={cn(
                                "mr-3 h-4 w-4",
                                selectedResult?.title === item.title ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <span className="text-sm font-medium truncate">{item.title}</span>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                                <Badge variant="accent" className="text-xs">{item.type}</Badge>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              )}
            </Popover>
          </div>
        </div>

        {/* Selected Result Display */}
        {selectedResult && (
          <div className="mt-6 p-4 bg-background/40 backdrop-blur-sm rounded-lg border border-border/50">
            <h3 className="text-lg font-semibold mb-2">{selectedResult.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{selectedResult.category}</Badge>
              <Badge variant="accent">{selectedResult.type}</Badge>
              {selectedResult.baserowId && (
                <Badge variant="outline">ID: {selectedResult.baserowId}</Badge>
              )}
            </div>
            {selectedResult.iframeUrl ? (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Audio available</p>
                <iframe 
                  src={selectedResult.iframeUrl} 
                  width="100%" 
                  height="200" 
                  className="rounded-md border"
                />
              </div>
            ) : (
              <p className="mt-3 text-muted-foreground">Audio coming soon.</p>
            )}
          </div>
        )}

        {/* Loading and Error States */}
        {baserowLoading && (
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Loading National events from Baserow...</p>
          </div>
        )}
        
        {baserowError && (
          <div className="text-center text-destructive">
            <p className="text-sm">Error loading data: {baserowError}</p>
          </div>
        )}

        {/* Search Instructions */}
        {!selectedResult && !baserowLoading && (
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Select a location and start typing to search through all Ijtima events and collections.
            </p>
            {baserowNationalData.length > 0 && (
              <p className="text-xs mt-1">
                Loaded {baserowNationalData.length} National events from Baserow
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
