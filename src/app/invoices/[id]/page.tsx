import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { InvoicesSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDownNarrowWide, ChevronDown, Edit2Icon, EditIcon } from "lucide-react";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatus } from "@/app/actions";


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

  return (
    <main className="flex flex-col 
      mt-10 gap-5 text-center">

      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-4">
          <h1 className="text-3xl font-bold"> Invoice {invoiceId} </h1>
          <span>
            <Badge className={cn("rounded-full capitalize",
              getInvoice.status == 'open' && 'bg-cyan-500',
              getInvoice.status == 'paid' && 'bg-green-500',
              getInvoice.status == 'void' && 'bg-zinc-700',
              getInvoice.status == 'uncollectible' && 'bg-red-600',
            )}>
              {getInvoice.status}
            </Badge>
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="font-semibold flex gap-1 items-center">
            <ChevronDown className="w-5 h-auto" /> <span> Change Status</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {AVAILABLE_STATUSES.map((status) => (
              <DropdownMenuItem key={status.id} className="capitalize ">
                <form action={updateStatus}>
                  <input type="hidden" name="id" value={invoiceId} />
                  <input type="hidden" name="status" value={status.id} />
                  <button className="hover:underline underline-offset-4"> {status.label} </button>
                </form>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TOTAL AMMOUNT  */}
      <h1 className=" text-left text-3xl">
        $ {getInvoice.value.toFixed(2)}
      </h1>

      {/* Description  */}
      <p className="text-left bg-cyan-600 rounded-md ring-2 
        ring-cyan-400 p-4 text-white w-60 whitespace-pre-line" >
        {getInvoice.description}
      </p>

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
