"use client";
import { register } from "@/actions/user";
import React, { useState } from "react";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData(event.currentTarget);
    try {
      const result = await register(formData);
      setSuccess(result.message);
      
    } catch (error: any) {
      setError(error?.message as string); 
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 h-96 border border-black rounded-2xl bg-gray-200 shadow-md flex flex-col justify-center items-center gap-2 font-serif"
      >
        <h1 className="text-2xl font-bold font-serif mb-3">
          Create your account
        </h1>
        <label className="font-semibold self-start px-12" htmlFor="username">
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
        <label htmlFor="email" className="self-start px-12 font-semibold">
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
        <label className="font-semibold self-start px-12" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="w-[300px] p-2 rounded-md"
          required
        />
        {error && <p className="px-4 text-red-500">{error}</p>}
        {success && <p className="px-4 text-green-500">{success}</p>}
        <button
          className="bg-black p-2 w-40 text-white font-bold text-xl rounded-lg hover:bg-gray-700 duration-100"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;