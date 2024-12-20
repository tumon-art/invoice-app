import { AVAILABLE_STATUSES } from '@/data/invoices';
import { integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export type Status = typeof AVAILABLE_STATUSES[number]["id"]
const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Status[]

export const statusEnum = pgEnum('status', statuses as [Status, ...Status[]])

export const InvoicesSchema = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  customerId: integer('customerId').notNull().references(() => Customers.id),
  status: statusEnum('status').notNull()
})

export const Customers = pgTable('customers', {
  id: serial('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  name: text('name').notNull(),
  email: text('email').notNull(),
})
