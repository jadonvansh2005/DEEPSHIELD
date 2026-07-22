"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#010409] border border-emerald-500/30 p-3 rounded-xl shadow-2xl backdrop-blur-xl">
        <p className="text-[9px] text-emerald-500/50 uppercase tracking-widest mb-1">Anomaly Score</p>
        <p className="text-white font-black text-lg">{(payload[0].value * 100).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

export default function GraphChart({ data }) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.05)" vertical={false} />
          <XAxis dataKey="time" hide={true} />
          <YAxis 
            domain={[0, 1]} 
            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 2 }} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={1000}
            style={{ filter: "drop-shadow(0px 0px 8px rgba(16, 185, 129, 0.6))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}