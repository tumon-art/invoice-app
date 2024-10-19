import { integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['open', 'paid', 'void', 'uncollectible'])
export const InvoicesSchema = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  status: statusEnum('status').notNull()
})
