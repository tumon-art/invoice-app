'use server'
import { db } from "@/db"
import { InvoicesSchema, Status } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { type } from "os"

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
