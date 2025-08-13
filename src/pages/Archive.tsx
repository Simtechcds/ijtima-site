import { useState, useMemo } from "react";
import Seo from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { searchableItems, locationOptions, type SearchItem } from "@/data/searchData";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Archive = () => {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState<SearchItem | null>(null);
  const [open, setOpen] = useState(false);

  // Filter items based on location selection
  const filteredItems = useMemo(() => {
    let items = searchableItems;
    
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
  }, [selectedLocation]);

  // Filter items based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return filteredItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10); // Limit to 10 results
  }, [searchQuery, filteredItems]);

  const handleSelectResult = (item: SearchItem) => {
    setSelectedResult(item);
    setSearchQuery(item.title);
    setOpen(false);
  };

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
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setOpen(true);
                    }}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onFocus={() => setOpen(true)}
                  />
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              {searchResults.length > 0 && (
                <PopoverContent className="w-full p-0 bg-background/95 backdrop-blur-md border-border/50" align="start">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {searchResults.map((item, index) => (
                          <CommandItem
                            key={index}
                            value={item.title}
                            onSelect={() => handleSelectResult(item)}
                            className="cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedResult?.title === item.title ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="text-sm">{item.title}</span>
                              <span className="text-xs text-muted-foreground">{item.category} • {item.type}</span>
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
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">{selectedResult.category}</span>
              <span className="bg-secondary/50 px-2 py-1 rounded">{selectedResult.type}</span>
            </div>
            <p className="mt-3 text-muted-foreground">Details coming soon.</p>
          </div>
        )}

        {/* Search Instructions */}
        {!selectedResult && (
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Select a location and start typing to search through all Ijtima events and collections.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Archive;
