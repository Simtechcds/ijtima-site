import Seo from "@/components/Seo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const SouthAfrica = () => {
  const nationalItems = [
    "1975 Lenasia (GP)",
    "1976 Chatsworth (KZN)",
    "1977 Benoni (GP)",
    "1978 Newcastle (KZN)",
    "1979 Springfield (KZN)",
    "1980 Laudium (GP)",
    "1981 Lenasia (GP)",
    "1982 Ladysmith (KZN)",
    "1983 PMB (KZN)",
    "1984 Azaadville (GP)",
    "1985 Stanger (KZN)",
    "1986 Springs (GP)",
    "1987 Roshnee (GP)",
    "1988 PMB (KZN)",
    "1989 Lenasia (GP)",
    "1990 Springfield (KZN)",
    "1991 Malboro (GP)",
    "1992 Newcastle (KZN)",
    "1993 Laudium (GP)",
    "1994 Roshnee (GP)",
    "1995 PMB (KZN)",
    "1996 Mayfair (GP)",
    "1997 Dundee (KZN)",
    "1998 Azaadville (GP)",
    "1999 Reservoir Hills (KZN)",
  ];

  const capeItems = [
    "2008 Cape Town (WC)",
    "2011 Port Elizabeth (EC)",
  ];

  return (
    <main className="space-y-6">
      <Seo title="South Africa — IJTIMA Collection" description="Local collections including Ijtima and Old Workers." />
      <Tabs defaultValue="National">
        <div className="mb-4">
          <Link to="/">
            <Button variant="olive" size="smWide">Back to Home</Button>
          </Link>
        </div>
        <TabsList className="segmented w-full">
          <TabsTrigger value="National" className="seg flex-1">National</TabsTrigger>
          <TabsTrigger value="Regional" className="seg flex-1">Regional</TabsTrigger>
          <TabsTrigger value="Old Workers" className="seg flex-1">Old Workers</TabsTrigger>
        </TabsList>

        <TabsContent value="National" className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {nationalItems.map((label, idx) => (
              <AccordionItem key={idx} value={`national-${idx}`}>
                <AccordionTrigger className="text-left">{label}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Details will be added soon.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="Regional" className="mt-4">
          <Tabs defaultValue="Gauteng">
            <TabsList className="segmented w-full">
              <TabsTrigger value="Gauteng" className="seg flex-1">Gauteng</TabsTrigger>
              <TabsTrigger value="KZN" className="seg flex-1">KZN</TabsTrigger>
              <TabsTrigger value="Cape" className="seg flex-1">Cape</TabsTrigger>
            </TabsList>

            <TabsContent value="Gauteng" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="gp-coming-soon">
                  <AccordionTrigger>Gauteng</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">Coming soon.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="KZN" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="kzn-coming-soon">
                  <AccordionTrigger>KZN</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">Coming soon.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="Cape" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {capeItems.map((label, idx) => (
                  <AccordionItem key={idx} value={`cape-${idx}`}>
                    <AccordionTrigger className="text-left">{label}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Details will be added soon.</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="Old Workers" className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="old-workers">
              <AccordionTrigger className="text-left">Old Workers Collection</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Explore the Old Workers collection with history and videos.</p>
                <Link to="/collection/old-workers">
                  <Button variant="olive" size="sm">View Collection</Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

    </main>
  );
};

export default SouthAfrica;
