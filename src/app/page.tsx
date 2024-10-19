import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center mx-auto">

      <h1 className="text-5xl font-bold"> Invoic Signup </h1>
      <p>
        <Button asChild>
          <Link href="/dashboard"> Sign in </Link>
        </Button>
      </p>
    </main>
  );
}
