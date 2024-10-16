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
import { CirclePlus } from 'lucide-react';
import Link from "next/link";

export default function Home() {
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
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className=" text-left font-bold p-4">10/10/2024</TableCell>
            <TableCell className="text-left font-bold p-4">John Doe</TableCell>
            <TableCell className="text-left p-4">johndoe@mail.com</TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full">Badge</Badge>
            </TableCell>
            <TableCell className="text-left font-bold p-4">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main >
  );
}
