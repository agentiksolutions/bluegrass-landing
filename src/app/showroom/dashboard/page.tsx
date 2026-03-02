"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const industries: Record<
  string,
  {
    label: string;
    kpis: { label: string; value: string; change: string; up: boolean }[];
    revenueData: { name: string; value: number }[];
    costBreakdown: { name: string; value: number; color: string }[];
    monthlyData: { name: string; revenue: number; costs: number }[];
    alerts: { type: "warning" | "action" | "info"; text: string }[];
    tableHeaders: string[];
    tableRows: string[][];
  }
> = {
  restaurant: {
    label: "Restaurant / Food Service",
    kpis: [
      { label: "Daily Revenue", value: "$4,218", change: "+8.2%", up: true },
      { label: "Food Cost", value: "28.4%", change: "-1.1%", up: true },
      { label: "Labor Cost", value: "31.2%", change: "+0.6%", up: false },
      { label: "Avg Ticket", value: "$14.80", change: "+3.4%", up: true },
    ],
    revenueData: [
      { name: "Mon", value: 3800 },
      { name: "Tue", value: 3200 },
      { name: "Wed", value: 4100 },
      { name: "Thu", value: 4400 },
      { name: "Fri", value: 5800 },
      { name: "Sat", value: 6200 },
      { name: "Sun", value: 4900 },
    ],
    costBreakdown: [
      { name: "Food", value: 28.4, color: "#0D7C66" },
      { name: "Labor", value: 31.2, color: "#2A9D8F" },
      { name: "Overhead", value: 18.6, color: "#6BB8A8" },
      { name: "Profit", value: 21.8, color: "#1C1C1E" },
    ],
    monthlyData: [
      { name: "Sep", revenue: 98000, costs: 76000 },
      { name: "Oct", revenue: 105000, costs: 79000 },
      { name: "Nov", revenue: 112000, costs: 82000 },
      { name: "Dec", revenue: 128000, costs: 91000 },
      { name: "Jan", revenue: 94000, costs: 74000 },
      { name: "Feb", revenue: 108000, costs: 80000 },
    ],
    alerts: [
      { type: "warning", text: "Food cost trending up 2.3% vs last period at Store #2" },
      { type: "action", text: "3 invoices pending review — $2,840 total" },
      { type: "info", text: "Saturday revenue hit 6-month high" },
    ],
    tableHeaders: ["Location", "Revenue", "Food %", "Labor %", "Profit"],
    tableRows: [
      ["Store #1 — Hamburg", "$142,600", "27.1%", "30.8%", "$18,200"],
      ["Store #2 — Richmond Rd", "$128,400", "29.8%", "32.1%", "$14,100"],
      ["Store #3 — Nicholasville", "$118,900", "28.2%", "30.6%", "$16,800"],
    ],
  },
  contractor: {
    label: "Construction / Trades",
    kpis: [
      { label: "Active Jobs", value: "14", change: "+2", up: true },
      { label: "Avg Job Margin", value: "34.2%", change: "+2.8%", up: true },
      { label: "Outstanding Invoices", value: "$48,200", change: "12 open", up: false },
      { label: "Crew Utilization", value: "87%", change: "+4%", up: true },
    ],
    revenueData: [
      { name: "Mon", value: 8200 },
      { name: "Tue", value: 9400 },
      { name: "Wed", value: 7800 },
      { name: "Thu", value: 11200 },
      { name: "Fri", value: 10600 },
      { name: "Sat", value: 4200 },
      { name: "Sun", value: 0 },
    ],
    costBreakdown: [
      { name: "Materials", value: 38.5, color: "#0D7C66" },
      { name: "Labor", value: 27.3, color: "#2A9D8F" },
      { name: "Equipment", value: 8.4, color: "#6BB8A8" },
      { name: "Profit", value: 25.8, color: "#1C1C1E" },
    ],
    monthlyData: [
      { name: "Sep", revenue: 142000, costs: 98000 },
      { name: "Oct", revenue: 158000, costs: 106000 },
      { name: "Nov", revenue: 134000, costs: 94000 },
      { name: "Dec", revenue: 96000, costs: 72000 },
      { name: "Jan", revenue: 118000, costs: 82000 },
      { name: "Feb", revenue: 164000, costs: 108000 },
    ],
    alerts: [
      { type: "warning", text: "Henderson remodel — materials 14% over estimate" },
      { type: "action", text: "5 invoices overdue 30+ days — $18,400" },
      { type: "info", text: "February was highest revenue month in 12 months" },
    ],
    tableHeaders: ["Job", "Budget", "Spent", "Margin", "Status"],
    tableRows: [
      ["Henderson Kitchen Remodel", "$42,000", "$28,600", "31.9%", "In Progress"],
      ["Oak Hill New Build", "$186,000", "$94,200", "—", "In Progress"],
      ["Beaumont Bath Reno", "$18,500", "$16,800", "38.4%", "Complete"],
    ],
  },
  professional: {
    label: "Professional Services",
    kpis: [
      { label: "Monthly Revenue", value: "$62,400", change: "+12%", up: true },
      { label: "Active Clients", value: "28", change: "+3", up: true },
      { label: "Avg Project Value", value: "$4,200", change: "+8%", up: true },
      { label: "Utilization Rate", value: "74%", change: "-2%", up: false },
    ],
    revenueData: [
      { name: "Mon", value: 3200 },
      { name: "Tue", value: 4100 },
      { name: "Wed", value: 3800 },
      { name: "Thu", value: 4600 },
      { name: "Fri", value: 3400 },
      { name: "Sat", value: 800 },
      { name: "Sun", value: 0 },
    ],
    costBreakdown: [
      { name: "Salaries", value: 42.0, color: "#0D7C66" },
      { name: "Software", value: 12.5, color: "#2A9D8F" },
      { name: "Overhead", value: 16.8, color: "#6BB8A8" },
      { name: "Profit", value: 28.7, color: "#1C1C1E" },
    ],
    monthlyData: [
      { name: "Sep", revenue: 54000, costs: 38000 },
      { name: "Oct", revenue: 58000, costs: 40000 },
      { name: "Nov", revenue: 52000, costs: 39000 },
      { name: "Dec", revenue: 48000, costs: 37000 },
      { name: "Jan", revenue: 56000, costs: 41000 },
      { name: "Feb", revenue: 62400, costs: 44000 },
    ],
    alerts: [
      { type: "warning", text: "Utilization dipped below 75% target this week" },
      { type: "action", text: "4 proposals awaiting client response — $32,000 pipeline" },
      { type: "info", text: "Client retention rate at 92% — up from 88% last quarter" },
    ],
    tableHeaders: ["Client", "Project Value", "Hours Used", "Budget Left", "Status"],
    tableRows: [
      ["Meridian Group", "$8,400", "42 / 60", "$2,100", "Active"],
      ["Stonebridge LLC", "$5,200", "28 / 40", "$1,560", "Active"],
      ["Apex Partners", "$12,000", "58 / 80", "$3,300", "Active"],
    ],
  },
  retail: {
    label: "Retail / E-Commerce",
    kpis: [
      { label: "Monthly Sales", value: "$38,600", change: "+6.4%", up: true },
      { label: "Avg Order Value", value: "$47.20", change: "+$3.10", up: true },
      { label: "Inventory Turnover", value: "4.2x", change: "+0.3", up: true },
      { label: "Return Rate", value: "3.8%", change: "-0.4%", up: true },
    ],
    revenueData: [
      { name: "Mon", value: 1200 },
      { name: "Tue", value: 1400 },
      { name: "Wed", value: 1600 },
      { name: "Thu", value: 1800 },
      { name: "Fri", value: 2400 },
      { name: "Sat", value: 2800 },
      { name: "Sun", value: 1900 },
    ],
    costBreakdown: [
      { name: "COGS", value: 44.0, color: "#0D7C66" },
      { name: "Labor", value: 18.5, color: "#2A9D8F" },
      { name: "Rent & Overhead", value: 22.0, color: "#6BB8A8" },
      { name: "Profit", value: 15.5, color: "#1C1C1E" },
    ],
    monthlyData: [
      { name: "Sep", revenue: 32000, costs: 27000 },
      { name: "Oct", revenue: 34000, costs: 28000 },
      { name: "Nov", revenue: 42000, costs: 34000 },
      { name: "Dec", revenue: 52000, costs: 40000 },
      { name: "Jan", revenue: 30000, costs: 26000 },
      { name: "Feb", revenue: 38600, costs: 32000 },
    ],
    alerts: [
      { type: "warning", text: "12 SKUs below reorder point — restock needed" },
      { type: "action", text: "Weekend promo drove 34% more foot traffic vs last Saturday" },
      { type: "info", text: "Top seller this month: Item #0442 — 186 units" },
    ],
    tableHeaders: ["Category", "Revenue", "Units Sold", "Margin", "Trend"],
    tableRows: [
      ["Accessories", "$14,200", "302", "52%", "Up"],
      ["Apparel", "$12,800", "184", "44%", "Flat"],
      ["Home Goods", "$11,600", "96", "38%", "Up"],
    ],
  },
};

const alertStyles = {
  warning: { border: "border-l-gold", bg: "bg-gold/[0.06]" },
  action: { border: "border-l-emerald", bg: "bg-emerald/[0.06]" },
  info: { border: "border-l-stone", bg: "bg-stone/[0.06]" },
};

export default function DashboardDemoPage() {
  const [selected, setSelected] = useState<string | null>(null);

  // ─── INDUSTRY PICKER ───
  if (!selected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 py-10">
        <div className="max-w-[520px] w-full">
          <div className="mb-11">
            <div className="font-display text-xl font-bold mb-1.5">
              Bluegrass <span className="text-emerald">Advisory</span>
            </div>
            <p className="text-[13px] text-stone">Dashboard Demo</p>
          </div>

          <h2 className="font-display text-[28px] font-bold mb-2">
            Pick your industry.
          </h2>
          <p className="text-sm text-stone mb-8">
            See what your numbers could look like in a real dashboard. Sample
            data — but the layout is exactly what we&apos;d build for you.
          </p>

          <div className="flex flex-col gap-2.5">
            {Object.entries(industries).map(([key, ind]) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className="p-[18px_22px] rounded-md text-left border-2 border-[#e0ddd8] bg-white text-[15px] font-medium text-graphite hover:border-emerald hover:text-emerald transition-all cursor-pointer"
              >
                {ind.label}
              </button>
            ))}
          </div>

          <p className="text-center text-[11px] text-[#ccc] mt-11">
            Interactive. No signup. No data collected.
          </p>
        </div>
      </div>
    );
  }

  const data = industries[selected];

  // ─── DASHBOARD ───
  return (
    <div className="min-h-screen bg-[#F4F3F1] pt-[68px]">
      {/* Top bar */}
      <div className="bg-graphite px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-display text-base text-warm-white font-bold">
            Bluegrass <span className="text-emerald">Advisory</span>
          </span>
          <span className="text-[#444] text-sm">|</span>
          <span className="text-stone text-[13px]">Dashboard Demo</span>
        </div>
        <div className="flex gap-3 items-center">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="bg-[#2a2a2c] border border-[#444] rounded text-[#ccc] px-3 py-1.5 text-xs font-body cursor-pointer outline-none"
          >
            {Object.entries(industries).map(([key, ind]) => (
              <option key={key} value={key}>
                {ind.label}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-[#555] tracking-wider uppercase">
            Sample Data
          </span>
        </div>
      </div>

      <div className="p-7 max-w-[1100px] mx-auto">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {data.kpis.map((kpi, i) => (
            <div
              key={i}
              className="bg-white rounded-lg px-6 py-[22px] border border-[#e8e5e0]"
            >
              <div className="text-xs text-stone mb-1.5 font-medium">
                {kpi.label}
              </div>
              <div className="text-[28px] font-bold text-graphite mb-1">
                {kpi.value}
              </div>
              <div
                className={`text-xs font-semibold ${
                  kpi.up ? "text-emerald" : "text-[#c0392b]"
                }`}
              >
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 border border-[#e8e5e0]">
            <div className="text-[13px] font-semibold text-graphite mb-5">
              This Week — Daily Revenue
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "6px",
                    border: "1px solid #eee",
                  }}
                />
                <Bar dataKey="value" fill="#0D7C66" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#e8e5e0]">
            <div className="text-[13px] font-semibold text-graphite mb-5">
              Cost Breakdown
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={data.costBreakdown}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={2}
                >
                  {data.costBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v}%`]}
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "6px",
                    border: "1px solid #eee",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {data.costBreakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ background: item.color }}
                  />
                  <span className="text-[11px] text-stone">
                    {item.name} {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly trend + Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 border border-[#e8e5e0]">
            <div className="text-[13px] font-semibold text-graphite mb-5">
              6-Month Trend — Revenue vs Costs
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#999" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: number) => [`$${v.toLocaleString()}`]}
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "6px",
                    border: "1px solid #eee",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0D7C66"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0D7C66" }}
                />
                <Line
                  type="monotone"
                  dataKey="costs"
                  stroke="#ccc"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-5 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-emerald rounded-sm" />
                <span className="text-[11px] text-stone">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 bg-[#ccc] rounded-sm border-t border-dashed border-[#ccc]" />
                <span className="text-[11px] text-stone">Costs</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#e8e5e0]">
            <div className="text-[13px] font-semibold text-graphite mb-5">
              Alerts
            </div>
            <div className="flex flex-col gap-2.5">
              {data.alerts.map((alert, i) => {
                const s = alertStyles[alert.type];
                return (
                  <div
                    key={i}
                    className={`px-3.5 py-3 rounded-md ${s.bg} border-l-[3px] ${s.border} text-xs leading-relaxed text-[#555]`}
                  >
                    {alert.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg p-6 border border-[#e8e5e0] mb-6 overflow-x-auto">
          <div className="text-[13px] font-semibold text-graphite mb-4">
            Detail View
          </div>
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                {data.tableHeaders.map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-3 py-2.5 text-[11px] font-semibold text-stone uppercase tracking-wider border-b border-[#eee]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, i) => (
                <tr key={i} className="border-b border-[#f5f5f5]">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-3 py-3 text-[13px] ${
                        j === 0
                          ? "text-graphite font-semibold"
                          : "text-[#666]"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="bg-graphite rounded-lg p-9 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-warm-white mb-1.5">
              This is what your data could look like.
            </h3>
            <p className="text-[13px] text-stone leading-relaxed">
              Connected to your real systems. Updating automatically. No
              spreadsheets.
            </p>
          </div>
          <a
            href="mailto:phil@bluegrassadvisorygroup.com"
            className="bg-emerald text-warm-white px-7 py-3 rounded text-[13px] font-semibold whitespace-nowrap shrink-0 hover:bg-sage transition-colors"
          >
            Talk to Us
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-5">
          <span className="font-display text-sm text-stone">
            Bluegrass <span className="text-emerald">Advisory</span>
          </span>
          <span className="text-[11px] text-[#bbb] mx-2.5">&middot;</span>
          <span className="text-[11px] text-[#bbb]">
            Sample data for demonstration
          </span>
        </div>
      </div>
    </div>
  );
}
