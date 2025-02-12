"use server";
import { signIn } from "@/auth";
import { DBconnection } from "@/lib/db";
import { userModel } from "@/models/user";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    redirect('/')
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
}

export async function githubAuth() {
  await signIn("github",{redirectTo:('/')});
  
}

export async function register(formData: FormData) {
  const name = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log(name, email);

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  await DBconnection();

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    throw new Error("User already exists with these credentials");
  }

  const hashedPassword = await hash(password, 10);

  await userModel.create({
    email,
    name,
    password: hashedPassword,
  });

  return { message: "User created successfully" };
}
