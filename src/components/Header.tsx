import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-2  md:py-5">
      <Link href='/dashboard'>
        <h1 className=" text-2xl md:text-3xl font-bold decoration-cyan-600 
   leading-4 underline decoration-wavy">
          Invoice App
        </h1>
      </Link>
      <div>
        <SignedOut>
          <Button className="bg-cyan-500 px-2 md:px-3 cursor-pointer items-center flex gap-2 md:text-lg" asChild>
            <SignInButton>
              <div>
                <LogIn className=" w-4 md:w-5 h-auto" />
                Sign up
              </div>
            </SignInButton>
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
