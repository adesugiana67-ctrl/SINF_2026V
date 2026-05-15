"use client";

export default function PesertaDidikChart({
  laki,
  perempuan,
  sudah,
  belum,
}: {
  laki: number;
  perempuan: number;
  sudah: number;
  belum: number;
}) {
  const total = laki + perempuan;
  const totalVerval = sudah + belum;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Donut
        title="Komposisi Gender"
        slices={[
          { label: "Laki-laki", value: laki, color: "#3b82f6" },
          { label: "Perempuan", value: perempuan, color: "#ec4899" },
        ]}
        total={total}
      />
      <Donut
        title="Status Verval"
        slices={[
          { label: "Sudah", value: sudah, color: "#10b981" },
          { label: "Belum", value: belum, color: "#f59e0b" },
        ]}
        total={totalVerval}
      />
    </div>
  );
}

function Donut({
  title,
  slices,
  total,
}: {
  title: string;
  slices: { label: string; value: number; color: string }[];
  total: number;
}) {
  const R = 60;
  const r = 38;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const safe = total === 0 ? 1 : total;

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-medium text-slate-700 mb-2">{title}</h4>
      <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
        <circle cx="80" cy="80" r={R} fill="none" stroke="#f1f5f9" strokeWidth={R - r} />
        {slices.map((s, i) => {
          const len = (s.value / safe) * C;
          const dash = `${len} ${C - len}`;
          const offset = -acc;
          acc += len;
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={R - r}
              strokeDasharray={dash}
              strokeDashoffset={offset}
            />
          );
        })}
        <text
          x="80"
          y="84"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="#1e293b"
          transform="rotate(90 80 80)"
        >
          {total}
        </text>
      </svg>
      <div className="flex flex-wrap gap-3 mt-2 justify-center text-xs">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
            <span className="text-slate-600">
              {s.label} <strong>{s.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
