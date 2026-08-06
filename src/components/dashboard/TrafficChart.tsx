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

type TrafficChartProps = {
  data?: Array<{ date: string; views: number; visitors: number }>;
  isLoading?: boolean;
};

const dummyData = [
  { date: "Sen", views: 0, visitors: 0 },
  { date: "Sel", views: 0, visitors: 0 },
  { date: "Rab", views: 0, visitors: 0 },
  { date: "Kam", views: 0, visitors: 0 },
  { date: "Jum", views: 0, visitors: 0 },
  { date: "Sab", views: 0, visitors: 0 },
  { date: "Min", views: 0, visitors: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-bold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name === "views" ? "Tampilan" : "Pengunjung"}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrafficChart({ data = [], isLoading = false }: TrafficChartProps) {
  const chartData = data.length > 0 ? data : dummyData;

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px] rounded-3xl">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
        </div>
      )}
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
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
            dataKey="date"
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
            dataKey="views"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#colorTampilan)"
            dot={false}
            activeDot={{ r: 5, fill: "#10b981" }}
          />
          <Area
            type="monotone"
            dataKey="visitors"
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
