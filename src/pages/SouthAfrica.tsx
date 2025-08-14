import Seo from "@/components/Seo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useBaserowNationalEvents } from "@/hooks/useBaserowData";
import { useSouthAfricaData } from "@/hooks/useSouthAfricaData";
import { SegmentedFilter } from "@/components/ui/segmented-filter";
import { RefreshButton } from "@/components/ui/refresh-button";
import { useState, useMemo } from "react";
import type { ReactNode } from "react";

type SAItemProps = { value: string; label: string; pending?: boolean; children: ReactNode };

const SAItem = ({ value, label, pending = true, children }: SAItemProps) => {
  return (
    <div className="bg-[hsl(var(--plum))]/28 rounded-xl border border-border/50 backdrop-blur-md mb-2">
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
  
  // Fetch Regional and Old Workers data from iMain API
  const { events: gautengEvents, loading: gautengLoading, error: gautengError, refresh: refreshGauteng } = useSouthAfricaData('Gauteng');
  const { events: kznEvents, loading: kznLoading, error: kznError, refresh: refreshKzn } = useSouthAfricaData('KZN');
  const { events: capeEvents, loading: capeLoading, error: capeError, refresh: refreshCape } = useSouthAfricaData('Cape');
  const { events: oldWorkersEvents, loading: oldWorkersLoading, error: oldWorkersError, refresh: refreshOldWorkers } = useSouthAfricaData('Old Workers');
  
  // Filter and sort state for National
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<'all' | 'with-audio' | 'pending'>('all');

  // Filter and sort state for Regional views
  const [gautengSortOrder, setGautengSortOrder] = useState<'asc' | 'desc'>('asc');
  const [gautengFilterType, setGautengFilterType] = useState<'all' | 'with-audio' | 'pending'>('all');
  const [kznSortOrder, setKznSortOrder] = useState<'asc' | 'desc'>('asc');
  const [kznFilterType, setKznFilterType] = useState<'all' | 'with-audio' | 'pending'>('all');
  const [capeSortOrder, setCapeSortOrder] = useState<'asc' | 'desc'>('asc');
  const [capeFilterType, setCapeFilterType] = useState<'all' | 'with-audio' | 'pending'>('all');

  // Filter and sort state for Old Workers
  const [oldWorkersSortOrder, setOldWorkersSortOrder] = useState<'asc' | 'desc'>('asc');
  const [oldWorkersFilterType, setOldWorkersFilterType] = useState<'all' | 'with-audio' | 'pending'>('all');

  // Memoized filtered and sorted events for National
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

  // Function to filter and sort events from API data
  const filterAndSortEvents = (events: any[], sortOrder: 'asc' | 'desc', filterType: 'all' | 'with-audio' | 'pending') => {
    let filtered = [...events];
    
    // Apply filter
    if (filterType === 'with-audio') {
      filtered = filtered.filter(event => event.iframeHtml);
    } else if (filterType === 'pending') {
      filtered = filtered.filter(event => !event.iframeHtml);
    }
    
    // Apply sort (extract year and sort)
    filtered.sort((a, b) => {
      const yearA = parseInt(a.year || '0');
      const yearB = parseInt(b.year || '0');
      return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
    });
    
    return filtered;
  };

  const handleClearAll = () => {
    setSortOrder('asc');
    setFilterType('all');
  };

  const handleGautengClearAll = () => {
    setGautengSortOrder('asc');
    setGautengFilterType('all');
  };

  const handleKznClearAll = () => {
    setKznSortOrder('asc');
    setKznFilterType('all');
  };

  const handleCapeClearAll = () => {
    setCapeSortOrder('asc');
    setCapeFilterType('all');
  };

  const handleOldWorkersClearAll = () => {
    setOldWorkersSortOrder('asc');
    setOldWorkersFilterType('all');
  };

  // Memoized filtered arrays for each section
  const filteredGautengEvents = useMemo(() => 
    filterAndSortEvents(gautengEvents, gautengSortOrder, gautengFilterType), 
    [gautengEvents, gautengSortOrder, gautengFilterType]
  );

  const filteredKznEvents = useMemo(() => 
    filterAndSortEvents(kznEvents, kznSortOrder, kznFilterType), 
    [kznEvents, kznSortOrder, kznFilterType]
  );

  const filteredCapeEvents = useMemo(() => 
    filterAndSortEvents(capeEvents, capeSortOrder, capeFilterType), 
    [capeEvents, capeSortOrder, capeFilterType]
  );

  const filteredOldWorkersEvents = useMemo(() => 
    filterAndSortEvents(oldWorkersEvents, oldWorkersSortOrder, oldWorkersFilterType), 
    [oldWorkersEvents, oldWorkersSortOrder, oldWorkersFilterType]
  );

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
              Loading National events from iMain API...
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
              {gautengLoading && (
                <div className="text-center text-muted-foreground py-8">
                  Loading Gauteng events from iMain API...
                </div>
              )}
              
              {gautengError && (
                <div className="text-center text-muted-foreground py-8">
                  <p>Coming Soon</p>
                  <p className="text-sm">Content for this region is being prepared.</p>
                </div>
              )}
              
              {!gautengLoading && !gautengError && (
                <>
                  <SegmentedFilter
                    sortOrder={gautengSortOrder}
                    filterType={gautengFilterType}
                    onSortChange={setGautengSortOrder}
                    onFilterChange={setGautengFilterType}
                    onClearAll={handleGautengClearAll}
                  />
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {filteredGautengEvents.map((event) => (
                      <SAItem 
                        key={event.id} 
                        value={`gauteng-${event.id}`} 
                        label={`${event.year || ''} ${event.city || event.title}${event.region ? ` (${event.region})` : ''}`}
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

            <TabsContent value="KZN" className="mt-4">
              {kznLoading && (
                <div className="text-center text-muted-foreground py-8">
                  Loading KZN events from iMain API...
                </div>
              )}
              
              {kznError && (
                <div className="text-center text-muted-foreground py-8">
                  <p>Coming Soon</p>
                  <p className="text-sm">Content for this region is being prepared.</p>
                </div>
              )}
              
              {!kznLoading && !kznError && (
                <>
                  <SegmentedFilter
                    sortOrder={kznSortOrder}
                    filterType={kznFilterType}
                    onSortChange={setKznSortOrder}
                    onFilterChange={setKznFilterType}
                    onClearAll={handleKznClearAll}
                  />
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {filteredKznEvents.map((event) => (
                      <SAItem 
                        key={event.id} 
                        value={`kzn-${event.id}`} 
                        label={`${event.year || ''} ${event.city || event.title}${event.region ? ` (${event.region})` : ''}`}
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

            <TabsContent value="Cape" className="mt-4">
              {capeLoading && (
                <div className="text-center text-muted-foreground py-8">
                  Loading Cape events from iMain API...
                </div>
              )}
              
              {capeError && (
                <div className="text-center text-muted-foreground py-8">
                  <p>Coming Soon</p>
                  <p className="text-sm">Content for this region is being prepared.</p>
                </div>
              )}
              
              {!capeLoading && !capeError && (
                <>
                  <SegmentedFilter
                    sortOrder={capeSortOrder}
                    filterType={capeFilterType}
                    onSortChange={setCapeSortOrder}
                    onFilterChange={setCapeFilterType}
                    onClearAll={handleCapeClearAll}
                  />
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {filteredCapeEvents.map((event) => (
                      <SAItem 
                        key={event.id} 
                        value={`cape-${event.id}`} 
                        label={`${event.year || ''} ${event.city || event.title}${event.region ? ` (${event.region})` : ''}`}
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
          </Tabs>
        </TabsContent>

        <TabsContent value="Old Workers" className="mt-4">
          {oldWorkersLoading && (
            <div className="text-center text-muted-foreground py-8">
              Loading Old Workers events from iMain API...
            </div>
          )}
          
          {oldWorkersError && (
            <div className="text-center text-muted-foreground py-8">
              <p>Coming Soon</p>
              <p className="text-sm">Content for this section is being prepared.</p>
            </div>
          )}
          
          {!oldWorkersLoading && !oldWorkersError && (
            <>
              <SegmentedFilter
                sortOrder={oldWorkersSortOrder}
                filterType={oldWorkersFilterType}
                onSortChange={setOldWorkersSortOrder}
                onFilterChange={setOldWorkersFilterType}
                onClearAll={handleOldWorkersClearAll}
              />
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredOldWorkersEvents.map((event) => (
                  <SAItem 
                    key={event.id} 
                    value={`oldworkers-${event.id}`} 
                    label={`${event.year || ''} ${event.city || event.title}${event.region ? ` (${event.region})` : ''}`}
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
      </Tabs>

    </main>
  );
};

export default SouthAfrica;