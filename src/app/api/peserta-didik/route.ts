import { db } from "@/db";
import { pesertaDidik } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(pesertaDidik).orderBy(desc(pesertaDidik.id));
  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = [
      "npsn",
      "namaSekolah",
      "alamatSekolah",
      "wilKecamatan",
      "zonasiKelDesa",
      "verval",
    ];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || body[k] === "") {
        return Response.json({ error: `Field '${k}' wajib diisi` }, { status: 400 });
      }
    }
    const [row] = await db
      .insert(pesertaDidik)
      .values({
        npsn: String(body.npsn),
        namaSekolah: String(body.namaSekolah),
        alamatSekolah: String(body.alamatSekolah),
        wilKecamatan: String(body.wilKecamatan),
        zonasiKelDesa: String(body.zonasiKelDesa),
        lakiLaki: Number(body.lakiLaki ?? 0),
        perempuan: Number(body.perempuan ?? 0),
        verval: String(body.verval),
      })
      .returning();
    return Response.json(row, { status: 201 });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
