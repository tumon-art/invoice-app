import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { InvoicesSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
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

      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-bold"> Invoice {invoiceId} </h1>
        <span>
          <Badge className={cn("rounded-full",
            getInvoice.status == 'open' && 'bg-cyan-500',
            getInvoice.status == 'paid' && 'bg-green-500',
            getInvoice.status == 'void' && 'bg-zinc-700',
            getInvoice.status == 'uncollectible' && 'bg-red-600',
          )}>
            {getInvoice.status}
          </Badge>
        </span>
      </div>

      {/* TOTAL AMMOUNT  */}
      <h1 className=" text-left text-3xl">
        $ {getInvoice.value.toFixed(2)}
      </h1>

      {/* Description  */}
      <p className="text-left" > {getInvoice.description} </p>

      <h3 className="mt-4 text-left text-lg font-semibold">
        Billing Details
      </h3>

      <ul className=" text-left">
        <li className=" flex gap-6">
          <p className="w-28"> Invoice ID </p> <span> {getInvoice.id} </span>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Invoice Date </p> <span> {new Date(getInvoice.created_at).toLocaleDateString()} </span>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Billng Name </p>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Billng Name </p>
        </li>
      </ul>
    </main >
  );
}
