import { Invoice1, Invoice2 } from "@/components/svg/invoice1";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col 
       text-center mx-auto w-full">

      <div className="mt-20 md:flex md:gap-32 justify-center ">

        <div className="flex flex-col gap-10">
          <h1 className="text-5xl font-bold"> Invoic App </h1>
          <p className="max-w-96" >An all-in-one invoicing platform where users can easily create, delete, and pay invoices. Simplify billing, track payments, and manage financial records securely in one place.</p>
          <p>
            <Button asChild className="bg-cyan-500 font-semibold py-4">
              <Link href="/dashboard"> Open Dashbard </Link>
            </Button>

          </p>
        </div>

        <div className=" flex justify-center">
          <Invoice2 tailwindCss=" md:w-full w-[60%]" />
        </div>

      </div>
    </main>
  );
}
