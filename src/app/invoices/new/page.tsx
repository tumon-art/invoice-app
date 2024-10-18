import { formAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function Home() {

  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoic App</h1>
      </div>

      <form action={formAction} className="md:w-60 flex flex-col gap-3">

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
          <Input id="value" name="value" type="text" />
        </div>
        <div className=" text-left">
          <Label htmlFor="description" className="font-semibold text-sm block mb-2">
            Description
          </Label>
          <Textarea id="description" name="description"></Textarea>
        </div>
        <Button type="submit" className="font-semibold"> Submit </Button>
      </form>
    </main >
  );
}
