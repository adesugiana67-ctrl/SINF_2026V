import { db } from "@/db";
import { akreditasi } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

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
      .update(akreditasi)
      .set({
        npsn: String(body.npsn),
        namaSekolah: String(body.namaSekolah),
        alamatSekolah: String(body.alamatSekolah),
        kepalaSekolah: String(body.kepalaSekolah),
        akreditasi: String(body.akreditasi),
        tahunAkreditasi: Number(body.tahunAkreditasi),
        berakhirTahun: Number(body.berakhirTahun),
        nomorSk: String(body.nomorSk),
      })
      .where(eq(akreditasi.id, numId))
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
  await db.delete(akreditasi).where(eq(akreditasi.id, numId));
  return Response.json({ ok: true });
}
