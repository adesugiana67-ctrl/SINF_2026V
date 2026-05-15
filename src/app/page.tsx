import { db } from "@/db";
import { akreditasi, pesertaDidik, eRapor } from "@/db/schema";
import { desc } from "drizzle-orm";
import AkreditasiChart from "@/components/charts/AkreditasiChart";
import PesertaDidikChart from "@/components/charts/PesertaDidikChart";
import ERaporChart from "@/components/charts/ERaporChart";
import SumedangLogo from "@/components/SumedangLogo";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [akData, pdData, erData] = await Promise.all([
    db.select().from(akreditasi).orderBy(desc(akreditasi.id)),
    db.select().from(pesertaDidik).orderBy(desc(pesertaDidik.id)),
    db.select().from(eRapor).orderBy(desc(eRapor.id)),
  ]);

  // Akreditasi distribution
  const akCounts: Record<string, number> = { A: 0, B: 0, C: 0, TT: 0, Belum: 0 };
  akData.forEach((a) => {
    akCounts[a.akreditasi] = (akCounts[a.akreditasi] || 0) + 1;
  });

  const currentYear = new Date().getFullYear();
  const expiringSoon = akData.filter(
    (a) => a.berakhirTahun >= currentYear && a.berakhirTahun <= currentYear + 1
  ).length;
  const expired = akData.filter((a) => a.berakhirTahun < currentYear).length;

  // Peserta didik totals
  const totalLaki = pdData.reduce((s, p) => s + p.lakiLaki, 0);
  const totalPerempuan = pdData.reduce((s, p) => s + p.perempuan, 0);
  const sudahVerval = pdData.filter((p) => p.verval.toLowerCase() === "sudah").length;
  const belumVerval = pdData.length - sudahVerval;
  const vervalPct = pdData.length === 0 ? 0 : Math.round((sudahVerval / pdData.length) * 100);

  // E-Rapor averages
  const avg = (key: keyof (typeof erData)[number]) => {
    if (erData.length === 0) return 0;
    return Math.round(
      erData.reduce((s, r) => s + (r[key] as number), 0) / erData.length
    );
  };
  const erAverages = {
    SKL: avg("skl"),
    "S.Isi": avg("sIsi"),
    "S.Proses": avg("sProses"),
    "S.Penilaian": avg("sPenilaian"),
    "S.PTK": avg("sPtk"),
    "S.Sapras": avg("sSapras"),
    "S.Pengelolaan": avg("sPengelolaan"),
    "S.Pembiayaan": avg("sPembiayaan"),
  };
  const overallSnp = Math.round(
    Object.values(erAverages).reduce((s, v) => s + v, 0) / 8
  );

  return (
    <div className="space-y-8">
      {/* Hero header card */}
      <div className="bg-white rounded-lg shadow border-t-4 border-blue-500 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <SumedangLogo className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 drop-shadow-lg" />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-blue-600 font-bold text-lg md:text-2xl leading-relaxed">
              DINAS PENDIDIKAN KABUPATEN SUMEDANG
              <br />
              <span className="text-base md:text-xl">
                STANDAR PENGELOLAAN SATUAN PENDIDIKAN NON FORMAL
              </span>
              <br />
              <span className="text-base md:text-xl">
                PENYELENGGARAAN PENDIDIKAN KESETARAAN SKB/PKBM TAHUN 2026
              </span>
            </h1>
            <p className="mt-4 italic text-slate-500 text-sm md:text-base">
              &quot;MANAJEMEN BERBASIS SEKOLAH (MBS) DAN PENGELOLAAN SISTEM INFORMASI (DIGITALISASI)&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickLink
          href="/akreditasi"
          title="Data Akreditasi"
          desc="Kelola status akreditasi lembaga PKBM/SKB"
          color="from-blue-500 to-blue-700"
          icon="📋"
        />
        <QuickLink
          href="/peserta-didik"
          title="Peserta Didik SPMB"
          desc="Rekap ATS/APS dengan status verval"
          color="from-emerald-500 to-emerald-700"
          icon="👥"
        />
        <QuickLink
          href="/e-rapor"
          title="E-Rapor 8 SNP"
          desc="Capaian Standar Nasional Pendidikan"
          color="from-rose-500 to-rose-700"
          icon="📊"
        />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Total Lembaga"
          value={akData.length}
          sublabel={`${expired} expired, ${expiringSoon} berakhir ≤1 thn`}
          color="bg-blue-500"
        />
        <KpiCard
          label="Total Peserta Didik"
          value={totalLaki + totalPerempuan}
          sublabel={`${totalLaki} L · ${totalPerempuan} P`}
          color="bg-emerald-500"
        />
        <KpiCard
          label="Status Verval"
          value={`${vervalPct}%`}
          sublabel={`${sudahVerval} sudah · ${belumVerval} belum`}
          color="bg-amber-500"
        />
        <KpiCard
          label="Rata-rata 8 SNP"
          value={`${overallSnp}%`}
          sublabel={`${erData.length} lembaga ter-input`}
          color="bg-rose-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Laporan Data Akreditasi"
          subtitle="Distribusi peringkat akreditasi lembaga"
          href="/akreditasi"
        >
          <AkreditasiChart data={akCounts} />
        </ChartCard>

        <ChartCard
          title="Laporan Peserta Didik SPMB ATS/APS"
          subtitle="Komposisi peserta didik & status verval"
          href="/peserta-didik"
        >
          <PesertaDidikChart
            laki={totalLaki}
            perempuan={totalPerempuan}
            sudah={sudahVerval}
            belum={belumVerval}
          />
        </ChartCard>

        <div className="lg:col-span-2">
          <ChartCard
            title="Laporan E-Rapor 8 SNP SKB/PKBM"
            subtitle="Rata-rata capaian Standar Nasional Pendidikan (%)"
            href="/e-rapor"
          >
            <ERaporChart data={erAverages} />
          </ChartCard>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentList
          title="Lembaga Terbaru (Akreditasi)"
          href="/akreditasi"
          items={akData.slice(0, 5).map((a) => ({
            primary: a.namaSekolah,
            secondary: `NPSN ${a.npsn} · Akreditasi ${a.akreditasi} · Berakhir ${a.berakhirTahun}`,
          }))}
        />
        <RecentList
          title="Input Peserta Didik Terbaru"
          href="/peserta-didik"
          items={pdData.slice(0, 5).map((p) => ({
            primary: p.namaSekolah,
            secondary: `${p.wilKecamatan} · L:${p.lakiLaki} P:${p.perempuan} · ${p.verval}`,
          }))}
        />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  title,
  desc,
  color,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  color: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className={`bg-gradient-to-br ${color} text-white p-5 rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-0.5 group`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <div className="font-bold text-base">{title}</div>
          <div className="text-xs text-white/80 mt-0.5">{desc}</div>
          <div className="text-xs mt-2 opacity-80 group-hover:opacity-100">Buka →</div>
        </div>
      </div>
    </Link>
  );
}

function KpiCard({
  label,
  value,
  sublabel,
  color,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className={`w-10 h-1 ${color} rounded mb-3`} />
      <div className="text-2xl md:text-3xl font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
      {sublabel && <div className="text-[11px] text-slate-400 mt-1">{sublabel}</div>}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  href,
  children,
}: {
  title: string;
  subtitle: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
        <Link
          href={href}
          className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          Lihat detail →
        </Link>
      </div>
      {children}
    </div>
  );
}

function RecentList({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { primary: string; secondary: string }[];
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
        <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        <Link href={href} className="text-xs text-blue-600 hover:underline">
          Semua →
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="text-sm text-slate-400 py-4 text-center">Belum ada data.</div>
      ) : (
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0"
            >
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-800 truncate">{it.primary}</div>
                <div className="text-xs text-slate-500 truncate">{it.secondary}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
