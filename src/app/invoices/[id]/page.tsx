import { db } from "@/db";
import { InvoicesSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const invoiceId = parseFloat(params.id)

  const [getInvoice] = await db.select()
    .from(InvoicesSchema)
    .where(eq(InvoicesSchema.id, invoiceId))
    .limit(1)

  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Invoic {invoiceId} </h1>
      </div>

    </main >
  );
}
