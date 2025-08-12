import React, { useMemo } from "react";
import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
} from "recharts";

const Views: React.FC = () => {
  // Mock analytics data (replace with live data later)
  const onlineNow = 2;

  const visitsSummary = {
    today: 126,
    yesterday: 254,
    last7: 980,
    thisMonth: 2345,
    lastMonth: 2210,
    thisYear: 15430,
    lastYear: 18750,
  };

  const devices = [
    { name: "Desktop", value: 64 },
    { name: "Mobile", value: 32 },
    { name: "Tablet", value: 4 },
  ];

  const trafficSources = [
    { name: "Direct", value: 45 },
    { name: "Referral", value: 25 },
    { name: "Search", value: 20 },
    { name: "Social", value: 10 },
  ];

  const browsers = [
    { name: "Chrome", value: 60 },
    { name: "Safari", value: 28 },
    { name: "Edge", value: 7 },
    { name: "Firefox", value: 3 },
    { name: "Other", value: 2 },
  ];

  const operatingSystems = [
    { name: "Windows", value: 48 },
    { name: "macOS", value: 18 },
    { name: "Android", value: 16 },
    { name: "iOS", value: 12 },
    { name: "Linux", value: 2 },
  ];

  const byCountry = [
    { name: "South Africa", value: 7200 },
    { name: "Botswana", value: 150 },
    { name: "Namibia", value: 110 },
    { name: "UK", value: 90 },
    { name: "USA", value: 70 },
    { name: "Other", value: 60 },
  ];

  const byCity = [
    { name: "Johannesburg", value: 1800 },
    { name: "Durban", value: 900 },
    { name: "Pretoria", value: 600 },
    { name: "Cape Town", value: 580 },
    { name: "Pietermaritzburg", value: 420 },
    { name: "Other", value: 300 },
  ];

  const pagesVisited = [
    { path: "/", visits: 1540, avg: "00:01:20" },
    { path: "/about", visits: 740, avg: "00:00:55" },
    { path: "/dashboard", visits: 620, avg: "00:02:10" },
    { path: "/contact", visits: 280, avg: "00:00:40" },
    { path: "/stats", visits: 210, avg: "00:01:05" },
  ];

  const entryPages = [
    { path: "/", entrances: 980 },
    { path: "/dashboard", entrances: 420 },
    { path: "/about", entrances: 260 },
    { path: "/stats", entrances: 180 },
  ];

  const exitPages = [
    { path: "/about", exits: 300 },
    { path: "/contact", exits: 210 },
    { path: "/", exits: 200 },
    { path: "/stats", exits: 160 },
  ];

  const lastUpdatedTime = useMemo(
    () => new Date().toLocaleTimeString([], { hour12: false }),
    []
  );

  const tooltipStyle: React.CSSProperties = {
    background: "hsl(var(--popover))",
    color: "hsl(var(--popover-foreground))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    padding: "6px 8px",
    boxShadow:
      "var(--shadow-elegant, 0 10px 30px -10px hsl(var(--primary) / 0.3))",
  };

  const pieColors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "hsl(var(--secondary))",
  ];

  return (
    <>
      <Seo
        title="Website Views Analytics"
        description="Glassmorphism analytics dashboard: real-time and historical visits, devices, traffic sources, geography, and pages."
        canonical={
          typeof window !== "undefined" ? `${window.location.origin}/views` : undefined
        }
      />

      <main role="main" className="container">
        <section aria-labelledby="views-title" className="py-6 md:py-8 lg:py-10">
          <div className="mx-auto w-[min(1200px,92%)]">
            {/* Top nav */}
            <div className="mb-4 flex items-center justify-between">
              <Button asChild variant="outlineBright" size="smWide">
                <Link to="/">
                  <ArrowLeft className="-ms-1" /> Back to Home
                </Link>
              </Button>
              <p className="text-xs md:text-sm text-muted-foreground">
                Last updated: <time>{lastUpdatedTime}</time>
              </p>
            </div>

            <header className="mb-6 md:mb-8 text-center">
              <h1
                id="views-title"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-xl"
              >
                Website Views Analytics
              </h1>
            </header>

            {/* KPI Cards */}
            <section
              aria-label="Realtime overview"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
            >
              {[{ label: "Online Now", value: onlineNow }, { label: "Visits Today", value: visitsSummary.today }, { label: "Visits Yesterday", value: visitsSummary.yesterday }].map(
                (kpi) => (
                  <article
                    key={kpi.label}
                    className="glass-surface hairline rounded-2xl module-frame animate-fade-in"
                  >
                    <Card className="bg-transparent border-transparent shadow-none">
                      <CardHeader className="p-4 md:p-6 pb-2">
                        <CardDescription className="text-xs md:text-sm">
                          {kpi.label}
                        </CardDescription>
                        <CardTitle className="text-2xl md:text-3xl lg:text-4xl">
                          {kpi.value.toLocaleString()}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </article>
                )
              )}
            </section>

            {/* Historical table */}
            <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in mb-6 md:mb-8">
              <div className="p-4 md:p-6 lg:p-8">
                <h2 className="text-lg md:text-xl font-semibold mb-1">Historical Visits</h2>
                <p className="text-sm text-muted-foreground mb-4">At-a-glance timeframe totals</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground text-left">
                        <th className="py-2 pe-4">Period</th>
                        <th className="py-2">Visits</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:not(:last-child)]:border-b [&_tr]:border-border/60">
                      {[
                        ["Today", visitsSummary.today],
                        ["Yesterday", visitsSummary.yesterday],
                        ["Last 7 Days", visitsSummary.last7],
                        ["This Month", visitsSummary.thisMonth],
                        ["Last Month", visitsSummary.lastMonth],
                        ["This Year", visitsSummary.thisYear],
                        ["Last Year", visitsSummary.lastYear],
                      ].map(([period, value]) => (
                        <tr key={period as string}>
                          <td className="py-3 pe-4">{period as string}</td>
                          <td className="py-3">{(value as number).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* Charts: Devices + Sources */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {[{ title: "Devices Used", data: devices }, { title: "Traffic Sources", data: trafficSources }].map(
                (block) => (
                  <article key={block.title} className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                    <div className="p-4 md:p-6 lg:p-8">
                      <h2 className="text-lg md:text-xl font-semibold mb-1">{block.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        {block.title === "Devices Used" ? "Desktop vs Mobile vs Tablet" : "Direct, Referral, Search, Social"}
                      </p>
                      <div className="h-64 md:h-72 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <ReTooltip contentStyle={tooltipStyle} />
                            <Pie data={block.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={6}>
                              {block.data.map((_, i) => (
                                <Cell key={`cell-${i}`} fill={pieColors[i % pieColors.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </article>
                )
              )}
            </section>

            {/* Charts: Browser + OS */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {[{ title: "Browser Breakdown", data: browsers }, { title: "Operating Systems", data: operatingSystems }].map(
                (block) => (
                  <article key={block.title} className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                    <div className="p-4 md:p-6 lg:p-8">
                      <h2 className="text-lg md:text-xl font-semibold mb-1">{block.title}</h2>
                      <div className="h-64 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={block.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <ReTooltip contentStyle={tooltipStyle} />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </article>
                )
              )}
            </section>

            {/* Geography */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {[{ title: "Visits by Country", data: byCountry }, { title: "Visits by City", data: byCity }].map(
                (block) => (
                  <article key={block.title} className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                    <div className="p-4 md:p-6 lg:p-8">
                      <h2 className="text-lg md:text-xl font-semibold mb-1">{block.title}</h2>
                      <div className="h-64 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={block.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <ReTooltip contentStyle={tooltipStyle} />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </article>
                )
              )}
            </section>

            {/* Pages tables */}
            <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in mb-6 md:mb-8">
              <div className="p-4 md:p-6 lg:p-8">
                <h2 className="text-lg md:text-xl font-semibold mb-1">Pages Visited</h2>
                <p className="text-sm text-muted-foreground mb-4">Most visited pages and time on page</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground text-left">
                        <th className="py-2 pe-4">Page</th>
                        <th className="py-2 pe-4">Visits</th>
                        <th className="py-2">Avg Time</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:not(:last-child)]:border-b [&_tr]:border-border/60">
                      {pagesVisited.map((row) => (
                        <tr key={row.path}>
                          <td className="py-3 pe-4">{row.path}</td>
                          <td className="py-3 pe-4">{row.visits.toLocaleString()}</td>
                          <td className="py-3">{row.avg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Entry */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">Entry Pages</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground text-left">
                          <th className="py-2 pe-4">Page</th>
                          <th className="py-2">Entrances</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:not(:last-child)]:border-b [&_tr]:border-border/60">
                        {entryPages.map((row) => (
                          <tr key={row.path}>
                            <td className="py-3 pe-4">{row.path}</td>
                            <td className="py-3">{row.entrances.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>

              {/* Exit */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">Exit Pages</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground text-left">
                          <th className="py-2 pe-4">Page</th>
                          <th className="py-2">Exits</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:not(:last-child)]:border-b [&_tr]:border-border/60">
                        {exitPages.map((row) => (
                          <tr key={row.path}>
                            <td className="py-3 pe-4">{row.path}</td>
                            <td className="py-3">{row.exits.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Views;
