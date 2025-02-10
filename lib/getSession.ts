import { auth } from "@/auth";

export async function getSession() {
  const session = await auth()
  const user =session?.user
  return user as string
}