import Image from "next/image";
import { auth} from "@/auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  const { id} = session?.user || {};
  return (
    <nav className="w-full flex justify-between px-8 py-4 items-center">
      <Link href={`/`}>
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
            
           
            
             <Link
  href={`post/author-details/${id}`}
  className="h-12 w-12 flex justify-center items-center bg-blue-300 rounded-full overflow-hidden"
>
  {session.user?.image ? (
    <Image
      src={session.user.image}
      alt="User Profile"
      width={48} 
      height={48}
      className="rounded-full object-cover"
    />
  ) : (
    <span className="font-bold text-white text-lg">
      {session.user?.name?.charAt(0) || "?"}
    </span>
  )}
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
