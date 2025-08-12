import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const raiwindList = [
  "2024 Raiwind Ijtema – Part 2",
  "2024 Raiwind Ijtema – Part 1",
  "2023 Raiwind Ijtema – Part 2",
  "2023 Raiwind Ijtema – Part 1",
  "2022 Raiwind Ijtema – Part 2",
  "2022 Raiwind Ijtema – Part 1",
  "2022 Old Workers Jor – Raiwind",
  "2021 Raiwind Ijtema – Part 2",
  "2021 Raiwind Ijtema – Part 1",
  "2021 Raiwind Old Workers Jor",
  "2020 Raiwind Ijtema",
  "2019 Raiwind Ijtema – Part 2",
  "2019 Raiwind Ijtema – Part 1",
  "2019 Old Workers Jor – Raiwind",
  "2018 Raiwind Ijtema – Part 2",
  "2018 Raiwind Ijtema – Part 1",
  "2017 Raiwind Ijtema",
  "2016 Raiwind Ijtema",
  "2014 Raiwind Ijtema",
  "2013 Raiwind Ijtema",
  "2012 Raiwind Ijtema",
  "2011 Raiwind Ijtema",
  "2010 Raiwind Ijtema",
  "2007 Raiwind Ijtema",
  "2006 Raiwind Ijtema",
];

const tongiList = ["2016 Tongi Ijtema"];

const nizamuddinList = [
  "2015 All Africa Nizamuddin Jor",
  "2013 All Africa Nizamuddin Jor",
  "2011 All Africa Nizamuddin Jor",
  "2011 All USA Nizamuddin Jor",
  "2011 All India Nizamuddin Jor",
  "2011 All Europe Nizamuddin Jor",
  "2006 SA Nizamuddin Jor",
  "2004 SA Nizamuddin Jor",
];

const ukList = ["2018 Blackburn", "2019 Blackburn", "2022 Blackburn"];
const canadaList = ["2011 Toronto", "2023 Canada"];
const otherList = ["2011 Gaza", "2014 Sweden", "2014 Sudan", "2014 Jordan"];
const indiaList = [
  "2025 Old Workers Jor (Panoli dist.)",
  "2024 Mosali (Panoli) Ijtema",
  "2023 All India Mashwara – Godhra",
  "2023 All India Mashwera – Bangalore",
  "2023 Dadhal (Panoli) Ijtema",
  "2022 Amrawati (Maharastra) Ijtema",
  "2022 Old Workers & Railway Workers – Bangalore",
  "2021 Kul Hind Mashwera – Delhi",
  "2021 Kathor (Panoli) Jor",
  "2019 Hyderabad Ijtema",
  "2019 Banaskantha Ijtema",
  "2019 Sarkhej Ijtema",
  "2019 Aanand Ijtema",
  "2019 Godhra Ijtema",
  "2018 Italwa (Surat) Ijtema",
  "2017 Surendra Nagar Ijtema",
];

type AccordionListProps = { items: readonly string[]; prefix: string };
const AccordionList = ({ items, prefix }: AccordionListProps) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((label, idx) => (
      <AccordionItem key={`${prefix}-${idx}`} value={`${prefix}-${idx}`}>
        <AccordionTrigger className="text-sm md:text-base text-left">{label}</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Details coming soon.</p>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

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

        <section className="glass-surface module-frame p-3">
          <Tabs defaultValue="major" className="w-full">
            <TabsList aria-label="International categories" className="segmented w-full">
              <TabsTrigger value="major" className="seg flex-1">Major</TabsTrigger>
              <TabsTrigger value="global" className="seg flex-1">Global</TabsTrigger>
            </TabsList>

            <TabsContent value="major">
              <section aria-labelledby="major-heading" className="mt-4">
                <h2 id="major-heading" className="sr-only">Major International Ijtimas</h2>

                <Tabs defaultValue="raiwind" className="w-full">
                    <TabsList aria-label="Major locations" className="segmented w-full mt-3">
                      <TabsTrigger value="raiwind" className="seg flex-1">Raiwind</TabsTrigger>
                      <TabsTrigger value="tongi" className="seg flex-1">Tongi</TabsTrigger>
                      <TabsTrigger value="nizamuddin" className="seg flex-1">Nizamuddin Jors</TabsTrigger>
                    </TabsList>

                  <TabsContent value="raiwind">
                    <AccordionList items={raiwindList} prefix="raiwind" />
                  </TabsContent>

                  <TabsContent value="tongi">
                    <AccordionList items={tongiList} prefix="tongi" />
                  </TabsContent>

                  <TabsContent value="nizamuddin">
                    <AccordionList items={nizamuddinList} prefix="nizamuddin" />
                  </TabsContent>
                </Tabs>
              </section>
            </TabsContent>

            <TabsContent value="global">
              <section aria-labelledby="global-heading" className="mt-4">
                <h2 id="global-heading" className="sr-only">Global Regions</h2>

                <Tabs defaultValue="uk" className="w-full">
                    <TabsList aria-label="Global locations" className="segmented w-full mt-3">
                      <TabsTrigger value="uk" className="seg flex-1">UK</TabsTrigger>
                      <TabsTrigger value="canada" className="seg flex-1">Canada</TabsTrigger>
                      <TabsTrigger value="other" className="seg flex-1">Other</TabsTrigger>
                      <TabsTrigger value="india" className="seg flex-1">India</TabsTrigger>
                    </TabsList>

                  <TabsContent value="uk">
                    <AccordionList items={ukList} prefix="uk" />
                  </TabsContent>

                  <TabsContent value="canada">
                    <AccordionList items={canadaList} prefix="canada" />
                  </TabsContent>

                  <TabsContent value="other">
                    <AccordionList items={otherList} prefix="other" />
                  </TabsContent>

                  <TabsContent value="india">
                    <AccordionList items={indiaList} prefix="india" />
                  </TabsContent>
                </Tabs>
              </section>
            </TabsContent>
          </Tabs>
        </section>

    </main>
  );
};

export default International;
