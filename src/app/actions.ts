'use server'
import { db } from "@/db"
import { InvoicesSchema, Status } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function addInvoice(formData: FormData) {
  const { userId } = auth();
  if (!userId) return;

  const rawFormData = {
    value: parseFloat(String(formData.get('value'))),
    description: String(formData.get('description')),
    status: "open"
  }


  const results = await db.insert(InvoicesSchema)
    .values({ ...rawFormData, status: "open", userId: userId })
    .returning({ id: InvoicesSchema.id })

  redirect(`/invoices/${results[0].id}`)
}

export async function updateStatus(formData: FormData) {
  const { userId } = auth();
  if (!userId) return;


  const rawFormData = {
    id: String(formData.get('value')),
    status: formData.get('status') as Status,
  }
}
