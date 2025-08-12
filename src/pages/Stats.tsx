import React, { useMemo } from "react";
import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

const Stats: React.FC = () => {
  // Mocked snapshot for demo – replace with live data later
  const regionalData = [
    { region: "Gauteng", count: 38 },
    { region: "KZN", count: 26 },
    { region: "Western Cape", count: 9 },
    { region: "Eastern Cape", count: 7 },
    { region: "Free State", count: 6 },
    { region: "Mpumalanga", count: 5 },
    { region: "Limpopo", count: 4 },
    { region: "North West", count: 4 },
    { region: "Northern Cape", count: 3 },
  ];

  const nationalOverview = [
    { label: "National Ijtimas", value: 24 },
    { label: "Regional Ijtimas", value: 75 },
    { label: "Old Workers", value: 23 },
    { label: "Total", value: 122 },
  ];

  const { focusData, colors } = useMemo(() => {
    const totalOthers = regionalData.slice(2).reduce((sum, r) => sum + r.count, 0);
    return {
      focusData: [
        { name: "Gauteng", value: regionalData[0].count },
        { name: "KZN", value: regionalData[1].count },
        { name: "Other", value: totalOthers },
      ],
      colors: [
        "hsl(var(--primary))",
        "hsl(var(--accent))",
        "hsl(var(--muted))",
      ],
    };
  }, []);

  const lastUpdated = useMemo(() => new Date().toLocaleString(), []);

  const tooltipStyle: React.CSSProperties = {
    background: "hsl(var(--popover))",
    color: "hsl(var(--popover-foreground))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    padding: "6px 8px",
    boxShadow: "var(--shadow-elegant, 0 10px 30px -10px hsl(var(--primary) / 0.3))",
  };

  return (
    <>
      <Seo
        title="Ijtima Stats Dashboard"
        description="Modern glassmorphism dashboard: National overview and regional Ijtima breakdowns with Gauteng and KZN focus."
        canonical={typeof window !== "undefined" ? `${window.location.origin}/stats` : undefined}
      />

      <main role="main" className="container">
        <section aria-labelledby="stats-title" className="py-6 md:py-8 lg:py-10">
          <div className="mx-auto w-[min(1200px,92%)]">
            <header className="mb-6 md:mb-8 text-center">
              <h1 id="stats-title" className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-xl">
                Ijtima Stats Dashboard
              </h1>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Last updated: <time dateTime={new Date().toISOString()}>{lastUpdated}</time>
              </p>
            </header>

            {/* KPI Cards */}
            <section aria-label="National overview" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {nationalOverview.map((kpi) => (
                <article key={kpi.label} className="glass-surface hairline rounded-2xl module-frame animate-fade-in">
                  <Card className="bg-transparent border-transparent shadow-none">
                    <CardHeader className="p-4 md:p-6 pb-2">
                      <CardDescription className="text-xs md:text-sm">{kpi.label}</CardDescription>
                      <CardTitle className="text-2xl md:text-3xl lg:text-4xl">{kpi.value.toLocaleString()}</CardTitle>
                    </CardHeader>
                  </Card>
                </article>
              ))}
            </section>

            {/* Charts Row */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Regional Breakdown Bar Chart */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">Regional Breakdown</h2>
                  <p className="text-sm text-muted-foreground mb-4">Ijtimas by region across South Africa</p>
                  <div className="h-64 md:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="region" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>

              {/* Province Focus Pie Chart */}
              <article className="relative overflow-hidden rounded-3xl glass-surface module-frame animate-fade-in">
                <div className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl font-semibold mb-1">Gauteng & KZN Focus</h2>
                  <p className="text-sm text-muted-foreground mb-4">Share of Ijtimas by Gauteng, KZN, and other provinces</p>
                  <div className="h-64 md:h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ReTooltip contentStyle={tooltipStyle} />
                        <Pie data={focusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={6}>
                          {focusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                      </PieChart>
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
