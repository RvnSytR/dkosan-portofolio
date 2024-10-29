"use server";

import { revalidatePath } from "next/cache";
import { SignInHandler } from "@/app/login/sign";

import { state } from "@/lib/db/state";
import { user } from "@/lib/db/schema";

// export async function ValidateSession(session: Session) {
//   const { id_user, username, email } = session!.user;
//   const [res] = await state.user.getById.execute({ id_user: id_user });
//   return res.username == username && res.email === email;
// }

export async function Check(email: string, password: string) {
  const [res] = await state.user.check.execute({
    email: email,
    password: password,
  });

  if (!res) throw new Error("Email atau Password Salah!");
  if (res.status == "pending")
    throw new Error(
      "Akun Anda masih dalam antrian persetujuan. Harap tunggu konfirmasi dari admin.",
    );
  else {
    await SignInHandler(email, password);
    return res.username;
  }
}

export async function Regis(data: Omit<typeof user.$inferInsert, "image">) {
  const { username, email, password } = data;
  const [check] = await state.user.getByEmail.execute({ email: email });

  if (check) throw new Error("Email sudah terdaftar!");
  else {
    await state.user.insert.execute({
      id_user: crypto.randomUUID(),
      username: username,
      email: email,
      password: password,
    });
  }
}

// export async function Approve(role: Exclude<Role, "pending">, id: string) {
//   await state.user.updateRole(role).execute({ id_user: id });
//   revalidatePath("/account");
// }

export async function Delete(id: string) {
  await state.user.delete.execute({ id_user: id });
  revalidatePath("/account");
}
