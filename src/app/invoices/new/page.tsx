import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "../../../db";
import { sql } from "drizzle-orm";

export default async function Home() {
  const results = await db.execute(sql`SELECT current_database()`)

  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center md:mx-10">

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoic App</h1>
      </div>
      {JSON.stringify(results)}

      <form className="md:w-60 flex flex-col gap-3">

        <div className=" text-left">
          <Label className="font-semibold text-sm block mb-2">
            Name
            <Input type="text" />
          </Label>

        </div>
        <div className=" text-left">
          <Label className="font-semibold text-sm block mb-2">
            Email
            <Input type="email" />
          </Label>

        </div>
        <div className=" text-left">
          <Label className="font-semibold text-sm block mb-2">
            Value
            <Input type="text" />
          </Label>
        </div>
        <div className=" text-left">
          <Label className="font-semibold text-sm block mb-2">
            Description
            <Textarea></Textarea>
          </Label>
        </div>
        <Button className="font-semibold"> Submit </Button>
      </form>
    </main >
  );
}
