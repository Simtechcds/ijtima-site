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
                {gautengItems.map((label, idx) => (
                  <AccordionItem key={idx} value={`gauteng-${idx}`}>
                    <AccordionTrigger className="text-left">{label}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Details will be added soon.</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="KZN" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {kznItems.map((label, idx) => (
                  <AccordionItem key={idx} value={`kzn-${idx}`}>
                    <AccordionTrigger className="text-left">{label}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">Details will be added soon.</AccordionContent>
                  </AccordionItem>
                ))}
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
            {oldWorkersItems.map((label, idx) => (
              <AccordionItem key={idx} value={`oldworkers-${idx}`}>
                <AccordionTrigger className="text-left">{label}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Details will be added soon.</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

    </main>
  );
};

export default SouthAfrica;
