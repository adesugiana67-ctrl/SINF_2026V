import { db } from "@/db";
import { eRapor } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(eRapor).orderBy(desc(eRapor.id));
  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = ["npsn", "namaLembaga", "keterisian"];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || body[k] === "") {
        return Response.json({ error: `Field '${k}' wajib diisi` }, { status: 400 });
      }
    }
    const clamp = (v: unknown) => {
      const n = Number(v ?? 0);
      if (Number.isNaN(n)) return 0;
      return Math.max(0, Math.min(100, Math.round(n)));
    };
    const [row] = await db
      .insert(eRapor)
      .values({
        npsn: String(body.npsn),
        namaLembaga: String(body.namaLembaga),
        skl: clamp(body.skl),
        sIsi: clamp(body.sIsi),
        sProses: clamp(body.sProses),
        sPenilaian: clamp(body.sPenilaian),
        sPtk: clamp(body.sPtk),
        sSapras: clamp(body.sSapras),
        sPengelolaan: clamp(body.sPengelolaan),
        sPembiayaan: clamp(body.sPembiayaan),
        keterisian: String(body.keterisian),
      })
      .returning();
    return Response.json(row, { status: 201 });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
