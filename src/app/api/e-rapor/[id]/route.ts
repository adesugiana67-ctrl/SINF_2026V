import { db } from "@/db";
import { eRapor } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const clamp = (v: unknown) => {
  const n = Number(v ?? 0);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
};

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const numId = Number(id);
  if (!numId) return Response.json({ error: "Invalid id" }, { status: 400 });
  try {
    const body = await req.json();
    const [row] = await db
      .update(eRapor)
      .set({
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
      .where(eq(eRapor.id, numId))
      .returning();
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(row);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const numId = Number(id);
  if (!numId) return Response.json({ error: "Invalid id" }, { status: 400 });
  await db.delete(eRapor).where(eq(eRapor.id, numId));
  return Response.json({ ok: true });
}
