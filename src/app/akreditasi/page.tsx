import { db } from "@/db";
import { akreditasi } from "@/db/schema";
import { desc } from "drizzle-orm";
import AkreditasiClient from "./AkreditasiClient";

export const dynamic = "force-dynamic";

export default async function AkreditasiPage() {
  const rows = await db.select().from(akreditasi).orderBy(desc(akreditasi.id));
  return <AkreditasiClient initialData={rows} />;
}
