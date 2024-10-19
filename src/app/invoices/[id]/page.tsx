import { Badge } from "@/components/ui/badge";
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
    <main className="flex flex-col 
      mt-20 gap-5 text-center md:mx-10">

      <div className="flex gap-6 items-center">
        <h1 className="text-3xl font-bold"> Invoice {invoiceId} </h1>
        <span>
          <Badge className="rounded-full">
            {getInvoice.status}
          </Badge>
        </span>
      </div>

      {/* TOTAL AMMOUNT  */}
      <h1 className=" mt-6 text-left text-3xl">
        $ {getInvoice.value.toFixed(2)}
      </h1>

      {/* Description  */}
      <p className="text-left" > {getInvoice.description} </p>

      <h3 className="mt-4 text-left text-lg font-semibold">
        Billing Details
      </h3>

      <div className=" text-left">
        <div className=" flex gap-10">
          <p> Invoice ID </p> <span> {getInvoice.id} </span>
        </div>


        <div className=" flex gap-10">
          <p> Invoice Date </p> <span> {new Date(getInvoice.created_at).toLocaleDateString()} </span>
        </div>

      </div>
    </main >
  );
}
