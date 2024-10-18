'use client'
import { addInvoice } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

function Submit() {
  const status = useFormStatus();
  return <Button disabled={status.pending} type="submit"
    className="font-semibold"> {status.pending ? <LoaderCircle className="animate-spin" /> : "Submit"} </Button>
}
export default function Home() {

  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoic App</h1>
      </div>

      <form action={addInvoice} className="md:w-60 flex flex-col gap-3">

        <div className=" text-left">
          <Label htmlFor="name" className="font-semibold text-sm block mb-2">
            Name
          </Label>
          <Input id="name" name="name" type="text" />

        </div>
        <div className=" text-left">
          <Label htmlFor="email" className="font-semibold text-sm block mb-2">
            Email
          </Label>
          <Input id="email" name="email" type="email" />

        </div>
        <div className=" text-left">
          <Label htmlFor="value" className="font-semibold text-sm block mb-2">
            Value
          </Label>
          <Input id="value" name="value" type="number" />
        </div>
        <div className=" text-left">
          <Label htmlFor="description" className="font-semibold text-sm block mb-2">
            Description
          </Label>
          <Textarea id="description" name="description"></Textarea>
        </div>
        <Submit />
      </form>
    </main >
  );
}
