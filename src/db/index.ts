import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Customers, InvoicesSchema } from './schema';

const client = postgres(process.env.SUPABASE_DATABASE_URL!);
export const db = drizzle(client, { schema: { InvoicesSchema, Customers } });
