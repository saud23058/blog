"use client";
import { login } from "@/actions/user";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import React, { useState } from "react";
import GithubButton from "../../component/GithubButton";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    try {
      await login(formData);
      router.push("/"); 
    } catch (error: any) {
      setError(error?.message as string);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 h-[500px] border border-black rounded-2xl bg-gray-200 shadow-md flex flex-col justify-center items-center gap-2 font-serif">
        <form
          className="flex flex-col items-center gap-2 justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold font-serif mb-3">Login</h1>
          <label htmlFor="email" className="self-start font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="saudkhan@gmail.com"
            className="w-[300px] p-2 rounded-md"
            required
          />
          <label className="font-semibold self-start" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className="w-[300px] p-2 rounded-md"
            required
            minLength={8}
          />
          {error && <p className="px-4 text-red-500">{error}</p>}
          <button
            className="bg-black p-2 mt-2 w-60 text-white font-bold rounded-lg hover:bg-gray-700 duration-100"
            type="submit"
          >
            Login
          </button>
          <p className="mb-3">
            Do not have an account?{" "}
            <Link className="text-blue-500" href="/signup">
              Register now
            </Link>
          </p>
        </form>
        <GithubButton />
      </div>
    </div>
  );
};

export default Login;
