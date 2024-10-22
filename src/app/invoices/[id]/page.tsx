import { db } from "@/db";
import { InvoicesSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Invoice from "./Invoice";


export default async function InvoicePage({ params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) return

  const invoiceId = parseFloat(params.id)

  const [getInvoice] = await db.select()
    .from(InvoicesSchema)
    .where(and(
      eq(InvoicesSchema.id, invoiceId),
      eq(InvoicesSchema.userId, userId),
    ))
    .limit(1)

  if (!getInvoice) notFound()

  return <Invoice invoice={getInvoice} />
}
