'use server'
import { db } from "@/db"
import { InvoicesSchema } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function addInvoice(formData: FormData) {
  const { userId } = auth();

  const rawFormData = {
    value: parseFloat(String(formData.get('value'))),
    description: String(formData.get('description')),
    status: "open"
  }

  if (!userId) return;

  const results = await db.insert(InvoicesSchema)
    .values({ ...rawFormData, status: "open", userId: userId })
    .returning({ id: InvoicesSchema.id })

  redirect(`/invoices/${results[0].id}`)
}
