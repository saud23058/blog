"use client";
import { register } from "@/actions/user";
import GithubButton from "@/app/component/GithubButton";

import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData(event.currentTarget);
    try {
      const result = await register(formData);
      setSuccess(result.message);
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
          <h1 className="text-2xl font-bold font-serif mb-3">
            Create your account
          </h1>
          <label className="font-semibold self-start" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Saud_khan"
            className="w-[300px] p-2 rounded-md"
            required
          />
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
          {success && <p className="px-4 text-green-500">{success}</p>}
          <button
            className="bg-black mt-2 p-2 w-60 text-white font-bold text-xl rounded-lg hover:bg-gray-700 duration-100"
            type="submit"
          >
            Signup
          </button>

          <p className="mb-3 ">
            Already have an account{" "}
            <Link className="text-blue-500" href="/login">
              Login now
            </Link>
          </p>
        </form>
        <GithubButton />
      </div>
    </div>
  );
};

export default Signup;
