'use server'
import { db } from "@/db"
import { Customers, InvoicesSchema, Status } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Stripe } from "stripe"


const stripe = new Stripe(String(process.env.STRIPE_API_KEY))

export async function addInvoice(formData: FormData) {
  const { userId } = auth();
  if (!userId) return;

  const rawFormData = {
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    value: parseFloat(String(formData.get('value'))),
    description: String(formData.get('description')),
    status: "open"
  }

  const [customers] = await db.insert(Customers)
    .values({ ...rawFormData, userId: userId })
    .returning({ id: Customers.id })

  const results = await db.insert(InvoicesSchema)
    .values({ ...rawFormData, status: "open", customerId: customers.id, userId: userId })
    .returning({ id: InvoicesSchema.id })

  redirect(`/invoices/${results[0].id}`)
}

export async function updateStatus(formData: FormData) {
  const { userId } = auth();
  if (!userId) return;


  const id = String(formData.get('id'))
  const status = formData.get('status') as Status

  await db.update(InvoicesSchema)
    .set({ status })
    .where(and(
      eq(InvoicesSchema.id, Number(id)),
      eq(InvoicesSchema.userId, userId),
    ))

  revalidatePath(`/invoices/${id}`, 'page')
}


export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = auth();
  if (!userId) return;

  const id = String(formData.get('id'))

  await db.delete(InvoicesSchema)
    .where(and(
      eq(InvoicesSchema.id, Number(id)),
      eq(InvoicesSchema.userId, userId),
    ))
  redirect('/dashboard')
}
