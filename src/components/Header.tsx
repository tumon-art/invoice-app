import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

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
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header;
