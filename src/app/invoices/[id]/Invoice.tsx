'use client'
import { Badge } from "@/components/ui/badge";
import { Customers, InvoicesSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { deleteInvoiceAction, updateStatus } from "@/app/actions";
import { useOptimistic } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


interface InvoiceProps {
  invoice: typeof InvoicesSchema.$inferSelect & {
    customer: typeof Customers.$inferSelect
  }
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
        <div className=" flex gap-5">
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



          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-semibold flex gap-1 items-center">
                <span className="sr-only"> More Options </span>
                <Ellipsis className="w-5 h-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <button className="hover:underline flex gap-2 underline-offset-4">
                      <Trash2 className="w-4 h-auto" />
                      Delete Status
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader className="gap-2">
                <DialogTitle className="text-2xl text-center">Delete Invoice?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your invoice
                  and remove your data from our servers.
                </DialogDescription>
                <DialogFooter>
                  <form action={deleteInvoiceAction} className="flex justify-center w-full" >
                    <input type="hidden" name="id" value={invoice.id} />
                    <Button variant="destructive" className="flex gap-2">
                      <Trash2 className="w-4 h-auto" />
                      Delete Status
                    </Button>
                  </form>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
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
          <p className=" w-28"> Billng Name </p> <span> {invoice.customer.name} </span>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Billng Email </p> <span> {invoice.customer.email} </span>
        </li>
      </ul>
    </main >
  );
}
