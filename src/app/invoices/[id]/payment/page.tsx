import { Badge } from "@/components/ui/badge";
import { Customers, InvoicesSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPayment, updateStatus } from "@/app/actions";
import { Stripe } from "stripe"

interface PaymentProps {

  params: { id: string }
  searchParams: {
    status: string;
    session_id: string;
  }
}

const stripe = new Stripe(String(process.env.STRIPE_API_KEY))

export default async function payment({ params, searchParams }: PaymentProps) {

  const invoiceId = parseFloat(params.id)


  const session_id = searchParams.session_id
  const isSuccess = session_id && searchParams.status === "success"
  const isCanceled = searchParams.status === "canceled"
  let isError = (isSuccess && !session_id)

  if (isNaN(invoiceId)) throw new Error("Invalid Invoice ID")

  if (isSuccess) {
    const { payment_status } = await stripe.checkout.sessions.retrieve(String(session_id))

    if (payment_status !== "paid") {
      isError = true
    } else {
      const formData = new FormData()
      formData.append('id', String(invoiceId))
      formData.append('status', "paid")
      await updateStatus(formData)
    }
  }

  const [getInvoice] = await db.select({
    id: InvoicesSchema.id,
    name: Customers.name,
    status: InvoicesSchema.status,
    created_at: InvoicesSchema.created_at,
    value: InvoicesSchema.value,
    description: InvoicesSchema.description
  })
    .from(InvoicesSchema)
    .innerJoin(Customers, eq(InvoicesSchema.id, Customers.id))
    .where(
      eq(InvoicesSchema.id, invoiceId),
    )
    .limit(1)

  if (!getInvoice) notFound()

  const invoices = {
    ...getInvoice,
    customer: {
      name: getInvoice.name
    }
  }
  return (
    <main className="flex flex-col 
      mt-10 gap-5 text-center">
      {isError && (
        <p className=" bg-red-100 text-red-800 rounded-lg py-2 mb-2 text-sm">
          Something went wrong, please try again. </p>
      )}

      {isCanceled && (
        <p className=" bg-yellow-100 text-red-800 rounded-lg py-2 mb-2 text-sm">
          Payment was Canceled, please try again. </p>
      )}
      <section className="md:grid grid-cols-2">
        <div>
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-4">
              <h1 className="text-3xl font-bold"> Invoice {invoices.id} </h1>
              <span>
                <Badge className={cn("rounded-full capitalize",
                  invoices.status == 'open' && 'bg-cyan-500',
                  invoices.status == 'paid' && 'bg-green-500',
                  invoices.status == 'void' && 'bg-zinc-700',
                  invoices.status == 'uncollectible' && 'bg-red-600',
                )}>
                  {invoices.status}
                </Badge>
              </span>
            </div>
          </div>

          {/* TOTAL AMMOUNT  */}
          <h1 className=" text-left text-3xl my-5">
            $ {invoices.value.toFixed(2)}
          </h1>

          {/* Description  */}
          <p className="text-left bg-cyan-600 rounded-md ring-2 
        ring-cyan-400 p-4 text-white w-60 whitespace-pre-line" >
            {invoices.description}
          </p>
        </div>

        {/* PAYMENT FORM */}
        <div className=" text-left mt-5 md:mt-0">
          <h2 className="text-xl font-bold mb-4"> Manage Invoice </h2>
          {invoices.status === 'open' && (
            <form action={createPayment}>
              <input type="hidden" name="id" value={invoices.id} />
              <Button className="flex font-semibold gap-2 bg-green-600">
                <CreditCard className="h-auto w-5" />
                Pay Invoice
              </Button>
            </form>
          )}

          {invoices.status === 'paid' && (
            <p className="text-xl font-bold flex gap-2 items-center">
              <Check className="w-6 h-auto bg-green-600 rounded-full text-white p-1" />
              Invoice Paid
            </p>
          )}
        </div>
      </section>
      <h3 className="mt-4 text-left text-lg font-semibold">
        Billing Details
      </h3>

      <ul className=" text-left">
        <li className=" flex gap-6">
          <p className="w-28"> Invoice ID </p> <span> {invoices.id} </span>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Invoice Date </p> <span> {new Date(invoices.created_at).toLocaleDateString()} </span>
        </li>

        <li className=" flex gap-6">
          <p className=" w-28"> Billng Name </p> <span> {invoices.customer.name} </span>
        </li>

      </ul>
    </main >
  );
}
