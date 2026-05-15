import { db } from "@/db";
import { pesertaDidik } from "@/db/schema";
import { desc } from "drizzle-orm";
import PesertaDidikClient from "./PesertaDidikClient";

export const dynamic = "force-dynamic";

export default async function PesertaDidikPage() {
  const rows = await db.select().from(pesertaDidik).orderBy(desc(pesertaDidik.id));
  return <PesertaDidikClient initialData={rows} />;
}
