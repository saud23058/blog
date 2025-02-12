import { auth, signOut } from '@/auth';
import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();
  if(!session) redirect('/')
  const { name, email, image } = session?.user || {};

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="w-80 sm:w-96 bg-white/30 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col items-center text-center border border-white/20">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
          {image ? (
            <Image src={image} alt={name || "User"} layout="fill" objectFit="cover" />
          ) : (
            <div className="w-full h-full flex justify-center items-center bg-gray-800 text-white text-3xl font-bold">
              {name?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mt-4">{name || "Anonymous"}</h1>
        <p className="text-lg text-white/90">{email || "No email available"}</p>
        <form className="mt-5 px-5 py-2 bg-white text-purple-500 rounded-full shadow-md font-semibold hover:bg-purple-600 hover:text-white transition-all"
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
          
              >
                Logout
              </button>
            </form>
      </div>
    </section>
  );
};

export default Page;

