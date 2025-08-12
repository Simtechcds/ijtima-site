import React, { useMemo } from "react";
import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

// Stats Dashboard (National Ijtima + Regional + OWJ)
// Data provided by user. Graphed with Recharts and themed via Tailwind tokens.

type NationalEvent = { year: number; venue: string; province: "JHB" | "KZN" };

const nationalEvents1975_1999: NationalEvent[] = [
  { year: 1975, venue: "Lenasia", province: "JHB" },
  { year: 1976, venue: "Chatsworth", province: "KZN" },
  { year: 1977, venue: "Benoni", province: "JHB" },
  { year: 1978, venue: "Newcastle", province: "KZN" },
  { year: 1979, venue: "Springfield", province: "KZN" },
  { year: 1980, venue: "Laudium", province: "JHB" },
  { year: 1981, venue: "Lenasia", province: "JHB" },
  { year: 1982, venue: "Ladysmith", province: "KZN" },
  { year: 1983, venue: "PMB", province: "KZN" },
  // As provided by user (Azaadville marked KZN for 1984)
  { year: 1984, venue: "Azaadville", province: "KZN" },
  { year: 1985, venue: "Stanger", province: "KZN" },
  { year: 1986, venue: "Springs", province: "JHB" },
  { year: 1987, venue: "Roshnee", province: "JHB" },
  { year: 1988, venue: "PMB", province: "KZN" },
  { year: 1989, venue: "Lenasia", province: "JHB" },
  { year: 1990, venue: "Springfield", province: "KZN" },
  { year: 1991, venue: "Malboro", province: "JHB" },
  { year: 1992, venue: "Newcastle", province: "KZN" },
  { year: 1993, venue: "Laudium", province: "JHB" },
  { year: 1994, venue: "Roshnee", province: "JHB" },
  { year: 1995, venue: "PMB", province: "KZN" },
  { year: 1996, venue: "Mayfair", province: "JHB" },
  { year: 1997, venue: "Dundee", province: "KZN" },
  { year: 1998, venue: "Azaadville", province: "JHB" },
  { year: 1999, venue: "Reservoir Hills", province: "KZN" },
];

// Regional Ijtimas (2000+). Each year may have a KZN and GP venue.
const regionalByYear: { year: number; KZN?: string; GP?: string }[] = [
  { year: 2000, KZN: "Ladysmith", GP: "Benoni" },
  { year: 2001, KZN: "Verulam", GP: "Lenasia" },
  { year: 2002, KZN: "Estcourt", GP: "Laudium" },
  { year: 2003, KZN: "Reservoir Hills", GP: "Maraisburg" },
  { year: 2004, KZN: "PMB", GP: "Nelspruit" },
  { year: 2005, KZN: "Stanger", GP: "Brits" },
  { year: 2006, KZN: "Chatswort", GP: "Pietersburg" },
  { year: 2007, KZN: "Reservoir Hills", GP: "Mayfair" },
  { year: 2008, KZN: "DBN - Hilal (KZN Jor)", GP: "Lenasia" },
  { year: 2009, KZN: "Port Shepstone", GP: "Roshnee" },
  { year: 2010, KZN: "Phoenix", GP: "Benoni" },
  { year: 2011, GP: "Laudium" },
  { year: 2012, KZN: "Newcastle", GP: "Azaadville" },
  { year: 2013, KZN: "Overport", GP: "Mia's Farm" },
  { year: 2014, KZN: "Isipingo Beach", GP: "Lenasia" },
  { year: 2015, KZN: "Stanger", GP: "Roshnee" },
  { year: 2016, KZN: "Ladysmith", GP: "Benoni" },
  { year: 2017, KZN: "Overport", GP: "Laudium" },
  { year: 2018, KZN: "PMB", GP: "Rustenburg" },
  { year: 2019, KZN: "Estcourt", GP: "Mia's Farm" },
  { year: 2020, GP: "Benoni" },
  { year: 2021 },
  { year: 2022, KZN: "Shakas kraal" },
  { year: 2023, KZN: "Newlands", GP: "Azaadville" },
  { year: 2024, KZN: "Newcastle", GP: "Lenasia" },
  { year: 2025, KZN: "Overport", GP: "Nasrec (near FNB Stadium)" },
];

// OWJ (Old Workers Jor) – totals per province
const owjByYear: { year: number; venue: string; province: "GP" | "KZN" | "CPT" | "PE" }[] = [
  { year: 2000, venue: "MADRASSAH ZAKARIYYA", province: "GP" },
  { year: 2001, venue: "CAMPERDOWN", province: "KZN" },
  { year: 2002, venue: "EPPING CAPE TOWN", province: "CPT" },
  { year: 2003, venue: "AZAADVILLE", province: "GP" },
  { year: 2004, venue: "ISIPINGO BEACH", province: "KZN" },
  { year: 2005, venue: "UITENHAGE", province: "PE" },
  { year: 2006, venue: "JOHANNESBURG", province: "GP" },
  { year: 2007, venue: "RESERVOIR HILLS", province: "KZN" },
  { year: 2009, venue: "UITENHAGE", province: "PE" },
  { year: 2010, venue: "MASJID UN NOOR", province: "GP" },
  { year: 2011, venue: "PHOENIX INDUSTRIAL", province: "KZN" },
  { year: 2012, venue: "CAPE TOWN", province: "CPT" },
  { year: 2013, venue: "LENASIA", province: "GP" },
  { year: 2014, venue: "MT EDGECOMBE", province: "KZN" },
  { year: 2015, venue: "CAPE TOWN", province: "CPT" },
  { year: 2016, venue: "BENONI", province: "GP" },
  { year: 2017, venue: "LAUDIUM", province: "GP" },
  { year: 2018, venue: "LADYSMITH", province: "KZN" },
  { year: 2019, venue: "LENASIA", province: "GP" },
  { year: 2022, venue: "SHAKASKRAAL", province: "KZN" },
  { year: 2023, venue: "ORMONDE", province: "GP" },
  { year: 2024, venue: "LA MERCY INDUSTRIAL", province: "KZN" },
  { year: 2025, venue: "MASJID UN NOOR", province: "GP" },
];

const Stats: React.FC = () => {
  // Color palette per spec (second image)
  const COLORS = {
    national: '#556B57', // Sage Pine
    regional: '#B06E4C', // Clay Saffron
    oldWorkers: '#7A4242', // Oxidized Red
    total: '#4F6473', // Harbor Blue
  } as const;

  const provinceColors = {
    JHB: COLORS.national,
    KZN: COLORS.regional,
    GP: COLORS.national,
    CPT: COLORS.oldWorkers,
    PE: COLORS.total,
  } as const;

  const tooltipStyle: React.CSSProperties = {
    background: "rgba(17, 25, 40, 0.85)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    padding: "6px 8px",
    boxShadow: "var(--shadow-elegant, 0 10px 30px -10px hsl(var(--primary) / 0.3))",
  };

  const lastUpdated = useMemo(() => {
    const d = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dd = d.getDate().toString().padStart(2, "0");
    const MMM = months[d.getMonth()];
    const yyyy = d.getFullYear();
    let hh = d.getHours();
    const ampm = hh >= 12 ? "PM" : "AM";
    hh = hh % 12; if (hh === 0) hh = 12;
    const HH = hh.toString().padStart(2, "0");
    const MM = d.getMinutes().toString().padStart(2, "0");
    const SS = d.getSeconds().toString().padStart(2, "0");
    return `${dd} ${MMM} ${yyyy}, ${HH}:${MM}:${SS} ${ampm}`;
  }, []);

  // National (1975–1999) – counts per venue and totals per province
  const { venueCounts, nationalTotals } = useMemo(() => {
    const venueMap = new Map<string, number>();
    const totals = { JHB: 0, KZN: 0 } as Record<"JHB" | "KZN", number>;

    for (const e of nationalEvents1975_1999) {
      venueMap.set(e.venue, (venueMap.get(e.venue) ?? 0) + 1);
      totals[e.province] += 1;
    }

    const venueCountsArr = Array.from(venueMap.entries())
      .map(([venue, count]) => ({ venue, count }))
      .sort((a, b) => b.count - a.count);

    return {
      venueCounts: venueCountsArr,
      nationalTotals: [
        { name: "JHB", value: totals.JHB },
        { name: "KZN", value: totals.KZN },
      ],
    };
  }, []);

  // Regional (2000+) – per-province venue tallies
  const { gpRegional, kznRegional } = useMemo(() => {
    const tally = (items: (string | undefined)[]) => {
      const map = new Map<string, number>();
      items.forEach((n) => {
        if (!n) return;
        const name = n.trim();
        if (!name) return;
        map.set(name, (map.get(name) ?? 0) + 1);
      });
      return Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    };

    const gp = tally(regionalByYear.map((r) => r.GP));
    const kzn = tally(regionalByYear.map((r) => r.KZN));
    return { gpRegional: gp, kznRegional: kzn };
  }, []);

  // OWJ – totals per province
  const owjTotals = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of owjByYear) {
      map.set(r.province, (map.get(r.province) ?? 0) + 1);
    }
    const arr = Array.from(map.entries())
      .map(([province, value]) => ({ province, value }))
      .sort((a, b) => b.value - a.value);
    return arr;
  }, []);

  const kpis = useMemo(() => {
    const national = nationalEvents1975_1999.length;
    const regional = regionalByYear.reduce((acc, r) => acc + (r.GP ? 1 : 0) + (r.KZN ? 1 : 0), 0);
    const owj = owjByYear.length;
    const total = national + regional + owj;
    return { national, regional, owj, total };
  }, []);

  return (
    <>
      <Seo
        title="SA Ijtima Stats Dashboard"
        description="Glass-style SA Ijtima statistics: national (1975–1999), GP & KZN regional breakdowns, and OWJ per province."
        canonical={typeof window !== "undefined" ? `${window.location.origin}/stats` : undefined}
      />

      <main role="main" className="container">
        <section aria-labelledby="stats-title" className="py-6 md:py-8 lg:py-10">
          <div className="mx-auto w-[min(1200px,92%)]">
            <header className="mb-6 md:mb-8 text-center">
              <h1 id="stats-title" className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-xl">
                SA IJTIMA STATS DASHBAORD
              </h1>
              <div className="mt-3 flex justify-center">
                <Badge className="rounded-full px-3 py-1 text-xs md:text-sm font-medium shadow" style={{ backgroundColor: COLORS.total, color: "#fff" }}>
                  Last Updated : <time dateTime={new Date().toISOString()} className="ml-1">{lastUpdated}</time>
                </Badge>
              </div>
            </header>

            {/* KPI Blocks */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <article className="relative overflow-hidden rounded-3xl module-frame animate-fade-in p-4 md:p-6" style={{ backgroundColor: COLORS.national }}>
                <p className="text-sm text-white/90">National Ijtimas</p>
                <p className="text-4xl md:text-5xl font-extrabold text-white">{kpis.national}</p>
              </article>
              <article className="relative overflow-hidden rounded-3xl module-frame animate-fade-in p-4 md:p-6" style={{ backgroundColor: COLORS.regional }}>
                <p className="text-sm text-white/90">Regional Ijtimas</p>
                <p className="text-4xl md:text-5xl font-extrabold text-white">{kpis.regional}</p>
              </article>
              <article className="relative overflow-hidden rounded-3xl module-frame animate-fade-in p-4 md:p-6" style={{ backgroundColor: COLORS.oldWorkers }}>
                <p className="text-sm text-white/90">Old Workers</p>
                <p className="text-4xl md:text-5xl font-extrabold text-white">{kpis.owj}</p>
              </article>
              <article className="relative overflow-hidden rounded-3xl module-frame animate-fade-in p-4 md:p-6" style={{ backgroundColor: COLORS.total }}>
                <p className="text-sm text-white/90">Total</p>
                <p className="text-4xl md:text-5xl font-extrabold text-white">{kpis.total}</p>
              </article>
            </section>

            {/* SA Ijtima Count (1975–1999) */}
            <section className="grid grid-cols-1 gap-4 md:gap-6 mb-6 md:mb-8">
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">SA Ijtima Count (1975–1999)</h2>
                  <p className="text-sm text-muted-foreground mb-4">Count by venue across JHB and KZN</p>
                    <div className="h-64 sm:h-72 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={venueCounts} layout="vertical" margin={{ left: 24, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                        <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="category" dataKey="venue" width={110} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="count" fill={COLORS.national} radius={[8, 8, 8, 8]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>
            </section>

            {/* Totals JHB vs KZN (1975–1999) */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">Total Count: 1975–1999</h2>
                  <p className="text-sm text-muted-foreground mb-4">JHB vs KZN</p>
                  <div className="h-64 sm:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Pie data={nationalTotals} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4}>
                          {nationalTotals.map((d, i) => (
                            <Cell key={d.name} fill={provinceColors[d.name as "JHB" | "KZN"]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">JHB vs KZN — Radial Comparison</h2>
                  <p className="text-sm text-muted-foreground mb-4">Alternative view of 1975–1999 totals</p>
                  <div className="h-64 sm:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="25%"
                        outerRadius="85%"
                        startAngle={90}
                        endAngle={-270}
                        data={nationalTotals.map((d) => ({ name: d.name, value: d.value, fill: provinceColors[d.name as "JHB" | "KZN"] }))}
                      >
                        <PolarAngleAxis type="number" domain={[0, Math.max(...nationalTotals.map((d) => d.value))]} tick={false} />
                        <ReTooltip contentStyle={tooltipStyle} />
                        <RadialBar background dataKey="value" />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>
            </section>

            {/* Regional Breakdown (2000+) */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* GP */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">GP Regional Ijtimas (from 2000)</h2>
                  <p className="text-sm text-muted-foreground mb-4">Count by venue</p>
                  <div className="h-64 sm:h-72 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gpRegional} layout="vertical" margin={{ left: 24, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="category" dataKey="name" width={120} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="count" fill={COLORS.regional} radius={[8, 8, 8, 8]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>

              {/* KZN */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">KZN Regional Ijtimas (from 2000)</h2>
                  <p className="text-sm text-muted-foreground mb-4">Count by venue</p>
                  <div className="h-64 sm:h-72 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={kznRegional} layout="vertical" margin={{ left: 24, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="category" dataKey="name" width={130} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="count" fill={COLORS.regional} radius={[8, 8, 8, 8]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>
            </section>

            {/* OWJ Totals */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* OWJ Pie */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">OWJ – Total Count by Province</h2>
                  <p className="text-sm text-muted-foreground mb-4">From 2000 onwards</p>
                  <div className="h-64 sm:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Pie data={owjTotals} dataKey="value" nameKey="province" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4}>
                          {owjTotals.map((d) => (
                            <Cell key={d.province} fill={provinceColors[d.province as keyof typeof provinceColors]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>

              {/* OWJ Horizontal Bars */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">OWJ – Count per Province</h2>
                  <p className="text-sm text-muted-foreground mb-4">Horizontal bar comparison</p>
                  <div className="h-64 sm:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={owjTotals.map((d) => ({ name: d.province, count: d.value }))} layout="vertical" margin={{ left: 24, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="category" dataKey="name" width={80} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="count" radius={[8, 8, 8, 8]}>
                          {owjTotals.map((d) => (
                            <Cell key={d.province} fill={provinceColors[d.province as keyof typeof provinceColors]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Stats;
