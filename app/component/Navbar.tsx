import Image from "next/image";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full flex justify-between px-8 py-4 items-center">
      <Link href="/">
        <Image src="/Logo.png" alt="Logo" width={144} height={33} />
      </Link>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <button className="font-bold">
            <Link
              href='/post/create-post'
              >
                create
            </Link>
             </button>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-pink-600 p-2 rounded-md font-semibold w-24"
              >
                Sign Out
              </button>
            </form>
           
            
            <Link
              href={`/user/${session.user.id}`}
              className="h-12 w-12 flex justify-center items-center bg-blue-300 rounded-full"
            >
              <span className="font-bold">{session.user?.name![0]}</span>
            </Link>
            
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <button className="bg-black text-white p-2 rounded-md font-semibold w-24">
                Login
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-black text-white p-2 rounded-md font-semibold w-24">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
