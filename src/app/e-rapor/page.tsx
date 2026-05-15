import { db } from "@/db";
import { eRapor } from "@/db/schema";
import { desc } from "drizzle-orm";
import ERaporClient from "./ERaporClient";

export const dynamic = "force-dynamic";

export default async function ERaporPage() {
  const rows = await db.select().from(eRapor).orderBy(desc(eRapor.id));
  return <ERaporClient initialData={rows} />;
}
