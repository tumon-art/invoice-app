'use client'
import { Badge } from "@/components/ui/badge";
import { InvoicesSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatus } from "@/app/actions";
import { useOptimistic } from "react";


interface InvoiceProps {
  invoice: typeof InvoicesSchema.$inferSelect
}
export default function Invoice({ invoice }: InvoiceProps) {

  const [currentStatus, setCurrentStatus] = useOptimistic(invoice.status, (state, newState) => String(newState))

  const handleUpdateStatus = async (formData: FormData) => {
    const originalStatus = currentStatus
    setCurrentStatus(formData.get('status'))

    try {
      await updateStatus(formData)
    } catch (error) {
      console.log(error)
      setCurrentStatus(originalStatus)
    }
  }
  return (
    <main className="flex flex-col 
      mt-10 gap-5 text-center">

      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-4">
          <h1 className="text-3xl font-bold"> Invoice {invoice.id} </h1>
          <span>
            <Badge className={cn("rounded-full capitalize",
              currentStatus == 'open' && 'bg-cyan-500',
              currentStatus == 'paid' && 'bg-green-500',
              currentStatus == 'void' && 'bg-zinc-700',
              currentStatus == 'uncollectible' && 'bg-red-600',
            )}>
              {currentStatus}
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
                <form action={handleUpdateStatus}>
                  <input type="hidden" name="id" value={invoice.id} />
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
        $ {invoice.value.toFixed(2)}
      </h1>

      {/* Description  */}
      <p className="text-left bg-cyan-600 rounded-md ring-2 
        ring-cyan-400 p-4 text-white w-60 whitespace-pre-line" >
        {invoice.description}
      </p>

      <h3 className="mt-4 text-left text-lg font-semibold">
        Billing Details
      </h3>

      <ul className=" text-left">
        <li className=" flex gap-6">
          <p className="w-28"> Invoice ID </p> <span> {invoice.id} </span>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Invoice Date </p> <span> {new Date(invoice.created_at).toLocaleDateString()} </span>
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
