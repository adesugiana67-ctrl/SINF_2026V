"use client";

export default function AkreditasiChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const entries = Object.entries(data);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  const colors: Record<string, string> = {
    A: "#10b981",
    B: "#3b82f6",
    C: "#f59e0b",
    TT: "#ef4444",
    Belum: "#94a3b8",
  };

  const W = 480;
  const H = 240;
  const padL = 36;
  const padB = 32;
  const padT = 12;
  const padR = 12;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW = chartW / entries.length - 16;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Y-axis grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padT + chartH - chartH * t;
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e2e8f0" />
              <text x={padL - 6} y={y + 4} fontSize="10" textAnchor="end" fill="#64748b">
                {Math.round(max * t)}
              </text>
            </g>
          );
        })}
        {entries.map(([k, v], i) => {
          const x = padL + (chartW / entries.length) * i + 8;
          const h = (v / max) * chartH;
          const y = padT + chartH - h;
          return (
            <g key={k}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                fill={colors[k] || "#3b82f6"}
                rx="4"
              />
              <text
                x={x + barW / 2}
                y={y - 4}
                fontSize="11"
                textAnchor="middle"
                fill="#334155"
                fontWeight="bold"
              >
                {v}
              </text>
              <text
                x={x + barW / 2}
                y={H - padB + 16}
                fontSize="11"
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
        {entries.map(([k]) => (
          <div key={k} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[k] || "#3b82f6" }}
            />
            <span className="text-slate-600">Akreditasi {k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
