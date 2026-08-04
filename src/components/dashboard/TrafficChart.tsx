"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hari: "Sen", tampilan: 120, pengunjung: 80 },
  { hari: "Sel", tampilan: 195, pengunjung: 130 },
  { hari: "Rab", tampilan: 160, pengunjung: 105 },
  { hari: "Kam", tampilan: 280, pengunjung: 190 },
  { hari: "Jum", tampilan: 310, pengunjung: 220 },
  { hari: "Sab", tampilan: 245, pengunjung: 160 },
  { hari: "Min", tampilan: 198, pengunjung: 138 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-bold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name === "tampilan" ? "Tampilan" : "Pengunjung"}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrafficChart() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Grafik Trafik</h2>
          <p className="text-sm text-slate-500 mt-0.5">7 hari terakhir</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            Tampilan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span>
            Pengunjung
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTampilan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPengunjung" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="hari"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="tampilan"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#colorTampilan)"
            dot={false}
            activeDot={{ r: 5, fill: "#10b981" }}
          />
          <Area
            type="monotone"
            dataKey="pengunjung"
            stroke="#60a5fa"
            strokeWidth={2.5}
            fill="url(#colorPengunjung)"
            dot={false}
            activeDot={{ r: 5, fill: "#60a5fa" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
