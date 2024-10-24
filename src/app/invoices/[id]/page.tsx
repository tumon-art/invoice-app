import { db } from "@/db";
import { Customers, InvoicesSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Invoice from "./Invoice";


export default async function InvoicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { userId } = auth()
  if (!userId) return

  const invoiceId = parseFloat(params.id)

  const [getInvoice] = await db.select()
    .from(InvoicesSchema)
    .innerJoin(Customers, eq(InvoicesSchema.id, Customers.id))
    .where(and(
      eq(InvoicesSchema.id, invoiceId),
      eq(InvoicesSchema.userId, userId),
    ))
    .limit(1)

  if (!getInvoice) notFound()

  const invoices = {
    ...getInvoice.invoices,
    customer: getInvoice.customers
  }

  return <Invoice invoice={invoices} />
}
