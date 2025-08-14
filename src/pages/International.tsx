import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RefreshButton } from "@/components/ui/refresh-button";
import { useRichInternationalData } from "@/hooks/useRichInternationalData";
import { useState } from "react";
import YouTubeNowPlaying from "@/components/media/YouTubeNowPlaying";
import SpreakerNowPlaying from "@/components/media/SpreakerNowPlaying";

// Dynamic data components for different international locations

type DynamicAccordionListProps = {
  category: 'Raiwind' | 'Tongi' | 'Nizamuddin' | 'UK' | 'Canada' | 'India' | 'Other' | 'Gauteng' | 'KZN' | 'Cape' | 'Old Worlders';
  prefix: string;
};

const DynamicAccordionList = ({ category, prefix }: DynamicAccordionListProps) => {
  const { events, loading, error, isPending, refresh } = useRichInternationalData(category);
  
  if (loading) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`${prefix}-loading`}>
          <AccordionTrigger className="text-sm md:text-base text-left">Loading {category} events...</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">Fetching data...</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  
  if (error) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`${prefix}-error`}>
          <AccordionTrigger className="text-sm md:text-base text-left">Coming Soon</AccordionTrigger>
          <AccordionContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-2">Content Coming Soon</p>
              <p className="text-sm text-muted-foreground">
                We're working on adding content for this section. Please check back later.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (isPending || events.length === 0) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`${prefix}-pending`}>
          <AccordionTrigger className="text-sm md:text-base text-left">
            {category} Collection
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-2">Pending Updates</p>
              <p className="text-sm text-muted-foreground">
                Content for this region is being prepared and will be available soon.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {events.map((event, idx) => {
        const displayTitle = event.year && event.city 
          ? `${event.year} ${event.city}`
          : event.title;
          
        return (
          <AccordionItem key={`${prefix}-${event.id}`} value={`${prefix}-${event.id}`}>
            <AccordionTrigger className="text-sm md:text-base text-left">
              {displayTitle}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Event Details */}
                {(event.location || event.region) && (
                  <div className="text-sm text-muted-foreground">
                    {event.location && <p>Location: {event.location}</p>}
                    {event.region && <p>Region: {event.region}</p>}
                  </div>
                )}
                
                {/* Audio/Video Content */}
                {event.iframeUrl && (
                  <div className="w-full">
                    {event.iframeUrl.includes('youtube.com') || event.iframeUrl.includes('youtu.be') ? (
                      <YouTubeNowPlaying 
                        videoId={extractYouTubeId(event.iframeUrl)} 
                        title={event.title}
                      />
                    ) : event.iframeUrl.includes('spreaker.com') ? (
                      <SpreakerNowPlaying src={event.iframeUrl} />
                    ) : (
                      <iframe
                        src={event.iframeUrl}
                        width="100%"
                        height="350"
                        frameBorder="0"
                        allowFullScreen
                        title={event.title}
                        className="rounded-md"
                      />
                    )}
                  </div>
                )}
                
                {/* Fallback if no media */}
                {!event.iframeUrl && (
                  <p className="text-muted-foreground">Content details for this event.</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

// Helper function to extract YouTube video ID
const extractYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const International = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    window.location.reload(); // Force full page refresh for all data
  };

  return (
    <main className="space-y-6">
      <Seo title="International — IJTIMA Collection" description="International hubs and related audios." />

      <header>
        <h1 className="sr-only">International Ijtima Collections</h1>
      </header>

      <div className="mb-4 flex justify-between items-center">
        <Link to="/">
          <Button variant="olive" size="smWide">Back to Home</Button>
        </Link>
        <RefreshButton onRefresh={handleRefresh} />
      </div>

        <div className="rounded-lg ring-1 ring-foreground/20 p-3">
          <Tabs defaultValue="major" className="w-full">
            <TabsList aria-label="International categories" className="segmented w-full">
              <TabsTrigger value="major" className="seg flex-1">Major</TabsTrigger>
              <TabsTrigger value="global" className="seg flex-1">Global</TabsTrigger>
            </TabsList>

            <TabsContent value="major">
              <section aria-labelledby="major-heading" className="mt-3">
                <h2 id="major-heading" className="sr-only">Major International Ijtimas</h2>

                <Tabs defaultValue="raiwind" className="w-full">
                    <TabsList aria-label="Major locations" className="segmented w-full">
                      <TabsTrigger value="raiwind" className="seg flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 leading-tight tracking-tight">Raiwind</TabsTrigger>
                      <TabsTrigger value="tongi" className="seg flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 leading-tight tracking-tight">Tongi</TabsTrigger>
                      <TabsTrigger value="nizamuddin" className="seg flex-1 text-xs sm:text-sm px-2.5 sm:px-4 py-2 leading-tight tracking-tight">Nizamuddin Jors</TabsTrigger>
                    </TabsList>

                  <TabsContent value="raiwind">
                    <DynamicAccordionList category="Raiwind" prefix="raiwind" />
                  </TabsContent>

                  <TabsContent value="tongi">
                    <DynamicAccordionList category="Tongi" prefix="tongi" />
                  </TabsContent>

                  <TabsContent value="nizamuddin">
                    <DynamicAccordionList category="Nizamuddin" prefix="nizamuddin" />
                  </TabsContent>
                </Tabs>
              </section>
            </TabsContent>

            <TabsContent value="global">
              <section aria-labelledby="global-heading" className="mt-3">
                <h2 id="global-heading" className="sr-only">Global Regions</h2>

                <Tabs defaultValue="uk" className="w-full">
                    <TabsList aria-label="Global locations" className="segmented w-full">
                      <TabsTrigger value="uk" className="seg flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 leading-tight tracking-tight">UK</TabsTrigger>
                      <TabsTrigger value="canada" className="seg flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 leading-tight tracking-tight">Canada</TabsTrigger>
                      <TabsTrigger value="other" className="seg flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 leading-tight tracking-tight">Other</TabsTrigger>
                      <TabsTrigger value="india" className="seg flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 leading-tight tracking-tight">India</TabsTrigger>
                    </TabsList>

                  <TabsContent value="uk">
                    <DynamicAccordionList category="UK" prefix="uk" />
                  </TabsContent>

                  <TabsContent value="canada">
                    <DynamicAccordionList category="Canada" prefix="canada" />
                  </TabsContent>

                  <TabsContent value="other">
                    <DynamicAccordionList category="Other" prefix="other" />
                  </TabsContent>

                  <TabsContent value="india">
                    <DynamicAccordionList category="India" prefix="india" />
                  </TabsContent>
                </Tabs>
              </section>
            </TabsContent>
          </Tabs>
        </div>

    </main>
  );
};

export default International;
