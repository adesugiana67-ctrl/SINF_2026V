"use client";

export default function ERaporChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const entries = Object.entries(data);
  const W = 720;
  const H = 280;
  const padL = 44;
  const padB = 50;
  const padT = 16;
  const padR = 16;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW = chartW / entries.length - 14;

  const colorFor = (v: number) =>
    v >= 80 ? "#10b981" : v >= 60 ? "#f59e0b" : v >= 40 ? "#fbbf24" : "#ef4444";

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {[0, 25, 50, 75, 100].map((t) => {
          const y = padT + chartH - (chartH * t) / 100;
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e2e8f0" />
              <text x={padL - 6} y={y + 4} fontSize="10" textAnchor="end" fill="#64748b">
                {t}%
              </text>
            </g>
          );
        })}
        {entries.map(([k, v], i) => {
          const x = padL + (chartW / entries.length) * i + 7;
          const h = (v / 100) * chartH;
          const y = padT + chartH - h;
          return (
            <g key={k}>
              <rect x={x} y={y} width={barW} height={h} fill={colorFor(v)} rx="3" />
              <text
                x={x + barW / 2}
                y={y - 4}
                fontSize="10"
                textAnchor="middle"
                fill="#334155"
                fontWeight="bold"
              >
                {v}%
              </text>
              <text
                x={x + barW / 2}
                y={H - padB + 14}
                fontSize="10"
                textAnchor="middle"
                fill="#475569"
              >
                {k}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-3 mt-3 text-xs">
        <Legend color="#10b981" label="Baik (≥80%)" />
        <Legend color="#f59e0b" label="Cukup (60-79%)" />
        <Legend color="#fbbf24" label="Sedang (40-59%)" />
        <Legend color="#ef4444" label="Kurang (<40%)" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
      <span className="text-slate-600">{label}</span>
    </div>
  );
}
