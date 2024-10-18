'use server'

import { db } from "@/db"
import { Invoices } from "@/db/schema"
import { redirect } from "next/navigation"

export async function addInvoice(formData: FormData) {
  const rawFormData = {
    value: parseFloat(String(formData.get('value'))),
    description: String(formData.get('description')),
    status: "open"
  }

  const results = await db.insert(Invoices)
    .values({ ...rawFormData, status: "open" })
    .returning({ id: Invoices.id })

  // redirect(`/invoices/${results[0].id}`)
}
