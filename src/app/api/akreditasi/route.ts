import { db } from "@/db";
import { akreditasi } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(akreditasi).orderBy(desc(akreditasi.id));
  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = [
      "npsn",
      "namaSekolah",
      "alamatSekolah",
      "kepalaSekolah",
      "akreditasi",
      "tahunAkreditasi",
      "berakhirTahun",
      "nomorSk",
    ];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || body[k] === "") {
        return Response.json({ error: `Field '${k}' wajib diisi` }, { status: 400 });
      }
    }
    const [row] = await db
      .insert(akreditasi)
      .values({
        npsn: String(body.npsn),
        namaSekolah: String(body.namaSekolah),
        alamatSekolah: String(body.alamatSekolah),
        kepalaSekolah: String(body.kepalaSekolah),
        akreditasi: String(body.akreditasi),
        tahunAkreditasi: Number(body.tahunAkreditasi),
        berakhirTahun: Number(body.berakhirTahun),
        nomorSk: String(body.nomorSk),
      })
      .returning();
    return Response.json(row, { status: 201 });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
