import Seo from "@/components/Seo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useBaserowNationalEvents } from "@/hooks/useBaserowData";
import { SegmentedFilter } from "@/components/ui/segmented-filter";
import { RefreshButton } from "@/components/ui/refresh-button";
import { useState, useMemo } from "react";
import type { ReactNode } from "react";

type SAItemProps = { value: string; label: string; pending?: boolean; children: ReactNode };

const SAItem = ({ value, label, pending = true, children }: SAItemProps) => {
  return (
    <div className={`${pending ? 'bg-[hsl(var(--plum))]/28' : 'bg-[hsl(var(--glass-white))]/20'} rounded-xl border border-border/50 backdrop-blur-md mb-2`}>
      <AccordionItem value={value} className="border-0">
        <AccordionTrigger className="text-left px-4">
          <span className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="whitespace-nowrap text-foreground font-medium text-shadow-soft">{label}</span>
            {pending && (
              <Badge variant="outline" className="badge-pending font-normal text-shadow-soft self-start sm:self-auto sm:ml-2">Updates Pending</Badge>
            )}
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-foreground/90 px-4 text-shadow-soft">
          {children}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const SouthAfrica = () => {
  // Fetch National events from Baserow
  const { events: nationalEvents, loading: nationalLoading, error: nationalError, refresh: refreshNational } = useBaserowNationalEvents();
  
  // Filter and sort state
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<'all' | 'with-audio' | 'pending'>('all');

  // Memoized filtered and sorted events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...nationalEvents];
    
    // Apply filter
    if (filterType === 'with-audio') {
      filtered = filtered.filter(event => event.iframeHtml);
    } else if (filterType === 'pending') {
      filtered = filtered.filter(event => !event.iframeHtml);
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
    });
    
    return filtered;
  }, [nationalEvents, sortOrder, filterType]);

  const handleClearAll = () => {
    setSortOrder('asc');
    setFilterType('all');
  };

  const capeItems = [
    "2008 Cape Town (WC)",
    "2011 Port Elizabeth (EC)",
  ];

  const gautengItems = [
    "2000 Benoni",
    "2001 Lenasia",
    "2002 Laudium",
    "2003 Maraisburg",
    "2004 Nelspruit",
    "2005 Brits",
    "2006 Pietersburg",
    "2007 Mayfair",
    "2008 Lenasia",
    "2009 Roshnee",
    "2010 Benoni",
    "2011 Laudium",
    "2012 Azaadville",
    "2013 Mia’s Farm",
    "2014 Lenasia",
    "2015 Roshnee",
    "2016 Benoni",
    "2017 Laudium",
    "2018 Rustenburg",
    "2019 Mia’s Farm",
    "2023 Azaadville",
    "2024 Lenasia",
    "2025 Johannesburg",
  ];

  const kznItems = [
    "2000 Ladysmith",
    "2001 Verulam",
    "2002 Estcourt",
    "2003 Reservoir Hills",
    "2004 PMB",
    "2005 Stanger",
    "2006 Chatsworth",
    "2007 Reservoir Hills",
    "2008 Masjid Al Hilal (DBN)",
    "2009 Port Shepstone",
    "2010 Phoenix",
    "2012 Newcastle",
    "2013 Overport",
    "2014 Isipingo Beach",
    "2015 Stanger",
    "2016 Ladysmith",
    "2017 Overport",
    "2018 PMB",
    "2019 Estcourt",
    "2023 Newlands",
    "2024 Newcastle",
    "2025 Overport",
  ];

  const oldWorkersItems = [
    "1998 Azaadville (GP)",
    "2000 Madressah Zakariyya (GP)",
    "2001 Camperdown (KZN)",
    "2002 Epping – Cape Town (WP)",
    "2003 Azaadville (KZN)",
    "2004 Isipingo Beach (KZN)",
    "2005 Cape Town (WC)",
    "2006 Johannesburg (GP)",
    "2007 Reservoir Hills (KZN)",
    "2008 Cape Town (WC)",
    "2008 Durban (KZN)",
    "2008 Johannesburg (GP)",
    "2009 Port Elizabeth (EC)",
    "2010 Masjid un Noor (GP)",
    "2011 Phoenix Industrial (KZN)",
    "2012 Cape Town (WC)",
    "2013 Lenasia (GP)",
    "2014 Mt Edgecombe (KZN)",
    "2015 Cape Town (WC)",
    "2016 Benoni (GP)",
    "2017 Laudium (GP)",
    "2018 Ladysmith (KZN)",
    "2019 Lenasia (GP)",
    "2022 Shakaskraal (KZN)",
    "2023 Ormonde (GP)",
    "2024 La Mercy (KZN)",
    "2025 Masjid un Noor (GP)",
  ];
  return (
    <main className="space-y-6">
      <Seo title="South Africa — IJTIMA.SITE" description="Local collections including Ijtima and Old Workers." />
      <Tabs defaultValue="National">
        <div className="mb-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="olive" size="smWide">Back to Home</Button>
          </Link>
          <RefreshButton onRefresh={refreshNational} />
        </div>
        <TabsList className="segmented w-full">
          <TabsTrigger value="National" className="seg flex-1">National</TabsTrigger>
          <TabsTrigger value="Regional" className="seg flex-1">Regional</TabsTrigger>
          <TabsTrigger value="Old Workers" className="seg flex-1">Old Workers</TabsTrigger>
        </TabsList>

        <TabsContent value="National" className="mt-4">
          {nationalLoading && (
            <div className="text-center text-muted-foreground py-8">
              Loading National events from Baserow...
            </div>
          )}
          
          {nationalError && (
            <div className="text-center text-destructive py-8">
              Error loading National events: {nationalError}
            </div>
          )}
          
          {!nationalLoading && !nationalError && (
            <>
              <SegmentedFilter
                sortOrder={sortOrder}
                filterType={filterType}
                onSortChange={setSortOrder}
                onFilterChange={setFilterType}
                onClearAll={handleClearAll}
              />
              
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredAndSortedEvents.map((event) => (
                  <SAItem 
                    key={event.id} 
                    value={`national-${event.id}`} 
                    label={`${event.year} ${event.city}${event.region ? ` (${event.region})` : ''}`}
                    pending={!event.iframeHtml}
                  >
                    {event.iframeHtml ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: event.iframeHtml }}
                        className="mt-2"
                      />
                    ) : (
                      <p>Audio coming soon.</p>
                    )}
                  </SAItem>
                ))}
              </Accordion>
            </>
          )}
        </TabsContent>

        <TabsContent value="Regional" className="mt-4">
          <Tabs defaultValue="Gauteng">
            <TabsList className="segmented w-full">
              <TabsTrigger value="Gauteng" className="seg flex-1">Gauteng</TabsTrigger>
              <TabsTrigger value="KZN" className="seg flex-1">KZN</TabsTrigger>
              <TabsTrigger value="Cape" className="seg flex-1">Cape</TabsTrigger>
            </TabsList>

            <TabsContent value="Gauteng" className="mt-4">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {gautengItems.map((label, idx) => (
                  <SAItem key={idx} value={`gauteng-${idx}`} label={label} pending>
                    Details will be added soon.
                  </SAItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="KZN" className="mt-4">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {kznItems.map((label, idx) => (
                  <SAItem key={idx} value={`kzn-${idx}`} label={label} pending>
                    Details will be added soon.
                  </SAItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="Cape" className="mt-4">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {capeItems.map((label, idx) => (
                  <SAItem key={idx} value={`cape-${idx}`} label={label} pending>
                    Details will be added soon.
                  </SAItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="Old Workers" className="mt-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {oldWorkersItems.map((label, idx) => (
              <SAItem key={idx} value={`oldworkers-${idx}`} label={label} pending>
                Details will be added soon.
              </SAItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

    </main>
  );
};

export default SouthAfrica;
