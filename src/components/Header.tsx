import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5">
      <Link href='/dashboard'>
        <h1 className=" text-3xl font-bold decoration-cyan-600 
        underline decoration-wavy">
          Invoice App
        </h1>
      </Link>
      <div>
        <SignedOut>
          <Button className=" text-lg font-semibold" asChild>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header;
