import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { CirclePlus } from 'lucide-react';
import Link from "next/link";

export default async function Home() {
  const invoices = await db.select().from(Invoices)

  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Invoic App</h1>
        <Button variant="ghost" className="inline-flex gap-2" asChild>
          <Link href="/invoices/new"><CirclePlus className="h-4 w-4" />Create Invoice </Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-2">Date</TableHead>
            <TableHead className="p-2">Customer</TableHead>
            <TableHead className="p-2">Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="p-2">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className=" text-left font-bold p-0">
                <Link href={`/invoices/${invoice.id}`} className="block px-2 py-4">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="text-left font-bold p-0">
                <Link href={`/invoices/${invoice.id}`} className="block px-2 py-4">
                  John Doe
                </Link>
              </TableCell>
              <TableCell className="text-left p-0">
                <Link href={`/invoices/${invoice.id}`} className="block px-2 py-4">
                  johndoe@mail.com
                </Link>
              </TableCell>
              <TableCell className="text-center p-0">
                <Link href={`/invoices/${invoice.id}`} className="block px-2 py-4">
                  <Badge className="rounded-full">
                    {invoice.status}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell className="text-left font-bold p-0">
                <Link href={`/invoices/${invoice.id}`} className="block px-2 py-4">
                  ${invoice.value}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main >
  );
}
