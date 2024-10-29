"use server";

import { signIn, signOut } from "@/lib/auth";

export async function SignInHandler(email: string, password: string) {
  const data = { email: email, password: password, redirect: false };
  await signIn("credentials", data);
}

export async function SignOutHandler() {
  await signOut({ redirect: false });
}
