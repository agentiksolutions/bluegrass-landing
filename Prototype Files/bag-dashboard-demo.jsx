import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const industries = {
  restaurant: {
    label: "Restaurant / Food Service",
    kpis: [
      { label: "Daily Revenue", value: "$4,218", change: "+8.2%", up: true },
      { label: "Food Cost", value: "28.4%", change: "-1.1%", up: true },
      { label: "Labor Cost", value: "31.2%", change: "+0.6%", up: false },
      { label: "Avg Ticket", value: "$14.80", change: "+3.4%", up: true },
    ],
    revenueData: [
      { name: "Mon", value: 3800 }, { name: "Tue", value: 3200 },
      { name: "Wed", value: 4100 }, { name: "Thu", value: 4400 },
      { name: "Fri", value: 5800 }, { name: "Sat", value: 6200 },
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
      { name: "Mon", value: 8200 }, { name: "Tue", value: 9400 },
      { name: "Wed", value: 7800 }, { name: "Thu", value: 11200 },
      { name: "Fri", value: 10600 }, { name: "Sat", value: 4200 },
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
      { name: "Mon", value: 3200 }, { name: "Tue", value: 4100 },
      { name: "Wed", value: 3800 }, { name: "Thu", value: 4600 },
      { name: "Fri", value: 3400 }, { name: "Sat", value: 800 },
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
      { name: "Mon", value: 1200 }, { name: "Tue", value: 1400 },
      { name: "Wed", value: 1600 }, { name: "Thu", value: 1800 },
      { name: "Fri", value: 2400 }, { name: "Sat", value: 2800 },
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

const DashboardDemo = () => {
  const [selected, setSelected] = useState(null);

  const alertStyles = {
    warning: { border: "#D4A017", bg: "rgba(212,160,23,0.06)", dot: "#D4A017" },
    action: { border: "#0D7C66", bg: "rgba(13,124,102,0.06)", dot: "#0D7C66" },
    info: { border: "#888", bg: "rgba(136,136,136,0.06)", dot: "#888" },
  };

  // ─── INDUSTRY PICKER ───
  if (!selected) {
    return (
      <div style={{
        fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E",
        background: "#FAF8F5", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 20px",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <div style={{ maxWidth: "520px", width: "100%" }}>
          <div style={{ marginBottom: "44px" }}>
            <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: "20px",
              fontWeight: 700, marginBottom: "6px",
            }}>
              Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span>
            </div>
            <p style={{ fontSize: "13px", color: "#999" }}>Dashboard Demo</p>
          </div>

          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "28px", fontWeight: 700, marginBottom: "8px",
          }}>Pick your industry.</h2>
          <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
            See what your numbers could look like in a real dashboard.
            Sample data — but the layout is exactly what we'd build for you.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {Object.entries(industries).map(([key, ind]) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                style={{
                  padding: "18px 22px", borderRadius: "6px", textAlign: "left",
                  border: "2px solid #e0ddd8", background: "#fff",
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: '"DM Sans", sans-serif', fontSize: "15px",
                  fontWeight: 500, color: "#1C1C1E",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#0D7C66"; e.currentTarget.style.color = "#0D7C66"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0ddd8"; e.currentTarget.style.color = "#1C1C1E"; }}
              >{ind.label}</button>
            ))}
          </div>

          <p style={{
            textAlign: "center", fontSize: "11px", color: "#ccc", marginTop: "44px",
          }}>Interactive. No signup. No data collected.</p>
        </div>
      </div>
    );
  }

  const data = industries[selected];

  // ─── DASHBOARD ───
  return (
    <div style={{
      fontFamily: '"DM Sans", sans-serif', color: "#1C1C1E",
      background: "#F4F3F1", minHeight: "100vh",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{
        background: "#1C1C1E", padding: "12px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{
            fontFamily: '"Playfair Display", serif', fontSize: "16px",
            color: "#FAF8F5", fontWeight: 700,
          }}>Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span></span>
          <span style={{ color: "#444", fontSize: "14px" }}>|</span>
          <span style={{ color: "#888", fontSize: "13px" }}>Dashboard Demo</span>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{
              background: "#2a2a2c", border: "1px solid #444", borderRadius: "4px",
              color: "#ccc", padding: "6px 12px", fontSize: "12px",
              fontFamily: '"DM Sans", sans-serif', cursor: "pointer", outline: "none",
            }}
          >
            {Object.entries(industries).map(([key, ind]) => (
              <option key={key} value={key}>{ind.label}</option>
            ))}
          </select>
          <span style={{
            fontSize: "10px", color: "#555", letterSpacing: "1px", textTransform: "uppercase",
          }}>Sample Data</span>
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* KPIs */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px",
          marginBottom: "24px",
        }}>
          {data.kpis.map((kpi, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "8px", padding: "22px 24px",
              border: "1px solid #e8e5e0",
            }}>
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "6px", fontWeight: 500 }}>
                {kpi.label}
              </div>
              <div style={{
                fontSize: "28px", fontWeight: 700, color: "#1C1C1E",
                fontFamily: '"DM Sans", sans-serif', marginBottom: "4px",
              }}>{kpi.value}</div>
              <div style={{
                fontSize: "12px", fontWeight: 600,
                color: kpi.up ? "#0D7C66" : "#c0392b",
              }}>{kpi.change}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px",
          marginBottom: "24px",
        }}>
          {/* Revenue chart */}
          <div style={{
            background: "#fff", borderRadius: "8px", padding: "24px",
            border: "1px solid #e8e5e0",
          }}>
            <div style={{
              fontSize: "13px", fontWeight: 600, color: "#1C1C1E", marginBottom: "20px",
            }}>This Week — Daily Revenue</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={v => [`$${v.toLocaleString()}`, "Revenue"]}
                  contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "1px solid #eee" }}
                />
                <Bar dataKey="value" fill="#0D7C66" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cost breakdown */}
          <div style={{
            background: "#fff", borderRadius: "8px", padding: "24px",
            border: "1px solid #e8e5e0",
          }}>
            <div style={{
              fontSize: "13px", fontWeight: 600, color: "#1C1C1E", marginBottom: "20px",
            }}>Cost Breakdown</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={data.costBreakdown}
                  dataKey="value"
                  cx="50%" cy="50%"
                  innerRadius={40} outerRadius={65}
                  paddingAngle={2}
                >
                  {data.costBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={v => [`${v}%`]}
                  contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "1px solid #eee" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px", justifyContent: "center" }}>
              {data.costBreakdown.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: item.color }} />
                  <span style={{ fontSize: "11px", color: "#888" }}>{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly trend + Alerts */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px",
          marginBottom: "24px",
        }}>
          {/* Monthly trend */}
          <div style={{
            background: "#fff", borderRadius: "8px", padding: "24px",
            border: "1px solid #e8e5e0",
          }}>
            <div style={{
              fontSize: "13px", fontWeight: 600, color: "#1C1C1E", marginBottom: "20px",
            }}>6-Month Trend — Revenue vs Costs</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={v => [`$${v.toLocaleString()}`]}
                  contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "1px solid #eee" }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#0D7C66" strokeWidth={2.5} dot={{ r: 4, fill: "#0D7C66" }} />
                <Line type="monotone" dataKey="costs" stroke="#ccc" strokeWidth={2} strokeDasharray="6 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "16px", height: "2px", background: "#0D7C66", borderRadius: "1px" }} />
                <span style={{ fontSize: "11px", color: "#888" }}>Revenue</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "16px", height: "2px", background: "#ccc", borderRadius: "1px", borderTop: "1px dashed #ccc" }} />
                <span style={{ fontSize: "11px", color: "#888" }}>Costs</span>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div style={{
            background: "#fff", borderRadius: "8px", padding: "24px",
            border: "1px solid #e8e5e0",
          }}>
            <div style={{
              fontSize: "13px", fontWeight: 600, color: "#1C1C1E", marginBottom: "20px",
            }}>Alerts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {data.alerts.map((alert, i) => {
                const s = alertStyles[alert.type];
                return (
                  <div key={i} style={{
                    padding: "12px 14px", borderRadius: "6px",
                    background: s.bg, borderLeft: `3px solid ${s.border}`,
                    fontSize: "12px", lineHeight: 1.5, color: "#555",
                  }}>
                    {alert.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: "8px", padding: "24px",
          border: "1px solid #e8e5e0", marginBottom: "24px",
        }}>
          <div style={{
            fontSize: "13px", fontWeight: 600, color: "#1C1C1E", marginBottom: "16px",
          }}>Detail View</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {data.tableHeaders.map((h, i) => (
                  <th key={i} style={{
                    textAlign: "left", padding: "10px 12px", fontSize: "11px",
                    fontWeight: 600, color: "#999", textTransform: "uppercase",
                    letterSpacing: "1px", borderBottom: "1px solid #eee",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: "12px", fontSize: "13px",
                      color: j === 0 ? "#1C1C1E" : "#666",
                      fontWeight: j === 0 ? 600 : 400,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div style={{
          background: "#1C1C1E", borderRadius: "8px", padding: "36px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "20px", fontWeight: 700, color: "#FAF8F5", marginBottom: "6px",
            }}>This is what your data could look like.</h3>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.5 }}>
              Connected to your real systems. Updating automatically. No spreadsheets.
            </p>
          </div>
          <a href="mailto:phil@bluegrassadvisorygroup.com" style={{
            background: "#0D7C66", color: "#FAF8F5", padding: "12px 28px",
            borderRadius: "4px", textDecoration: "none", fontSize: "13px",
            fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
          }}>Talk to Us</a>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: "32px", paddingTop: "20px",
        }}>
          <span style={{
            fontFamily: '"Playfair Display", serif', fontSize: "14px", color: "#999",
          }}>Bluegrass <span style={{ color: "#0D7C66" }}>Advisory</span></span>
          <span style={{ fontSize: "11px", color: "#bbb", margin: "0 10px" }}>·</span>
          <span style={{ fontSize: "11px", color: "#bbb" }}>Sample data for demonstration</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;
