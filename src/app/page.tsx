import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-screen flex flex-col 
      justify-center gap-5 text-center mx-auto">

      <h1 className="text-5xl font-bold"> Invoic App</h1>
      <p>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button asChild>
          <Link href="/dashboard"> Sign in </Link>
        </Button>
      </p>
    </main>
  );
}
