import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {
  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <h1 className="text-5xl font-bold"> Invoic App</h1>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Value</TableHead>
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
    </main>
  );
}
