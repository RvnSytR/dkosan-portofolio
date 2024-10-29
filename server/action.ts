"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function RedirectHandler(path: string) {
  redirect(path);
}

export async function RevalidatePathHandler(path: string) {
  revalidatePath(path);
}

export async function CheckRoutes(path: string) {
  const session = await auth();

  if (!session && !path.startsWith("/login")) redirect("/login");
  if (session && path.startsWith("/login")) redirect("/");
  // if (
  //   (session?.user.role == "user" && adminPath.includes(path)) ||
  //   (session?.user.role == "admin" && userPath.includes(path))
  // ) {
  //   notFound();
  // }
}
