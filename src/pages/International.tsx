import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useInternationalData } from "@/hooks/useInternationalData";

// Dynamic data components for different international locations

type DynamicAccordionListProps = {
  category: 'Raiwind' | 'Tongi' | 'Nizamuddin' | 'UK' | 'Canada' | 'India' | 'Other';
  prefix: string;
};

const DynamicAccordionList = ({ category, prefix }: DynamicAccordionListProps) => {
  const { events, loading, error } = useInternationalData(category);
  
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
          <AccordionTrigger className="text-sm md:text-base text-left">Error loading {category} events</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">Failed to load data: {error}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {events.map((label, idx) => (
        <AccordionItem key={`${prefix}-${idx}`} value={`${prefix}-${idx}`}>
          <AccordionTrigger className="text-sm md:text-base text-left">{label}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">Details coming soon.</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const International = () => {
  return (
    <main className="space-y-6">
      <Seo title="International — IJTIMA Collection" description="International hubs and related audios." />

      <header>
        <h1 className="sr-only">International Ijtima Collections</h1>
      </header>

      <div className="mb-4">
        <Link to="/">
          <Button variant="olive" size="smWide">Back to Home</Button>
        </Link>
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
