import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-screen flex flex-col 
      justify-center text-center mx-auto">

      <div className=" flex flex-col gap-20">
        <h1 className="text-5xl font-bold"> Invoic App </h1>
        <p>
          <Button asChild>
            <Link href="/dashboard"> Open Dashbard </Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
