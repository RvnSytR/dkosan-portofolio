"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import type { UserCredentials } from "@/lib/db/schema";
import { RedirectHandler } from "@/server/action";
import { SignOutHandler } from "@/app/login/sign";
import {
  Check,
  Regis,
  UpdatePassword,
  UpdateProfile,
} from "@/server/action-user";

import { z } from "zod";
import { zodUserSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Capitalize } from "@/lib/helper";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CustomLoader, iconSize } from "../global/icons";
import { LogIn } from "lucide-react";

export function LoginForm() {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const loginSchema = zodUserSchema.pick({ email: true, password: true });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const formHandler = async (data: z.infer<typeof loginSchema>) => {
    const { email, password } = data;
    setIsLoad(true);

    toast.promise(Check(email, password), {
      loading: "Loading...",
      success: async (username) => {
        RedirectHandler("/");
        return `Berhasil Masuk. Selamat Datang ${username}.`;
      },
      error: (e: Error) => {
        setIsLoad(false);
        return e.message;
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formHandler)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Masukkan Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2 gap-x-2" disabled={isLoad}>
          {isLoad ? (
            <CustomLoader customType="circle" size={iconSize.base} />
          ) : (
            <LogIn size={iconSize.base} />
          )}
          {isLoad ? "Logging In..." : "Masuk ke Omar Archives"}
        </Button>
      </form>
    </Form>
  );
}

export function RegisForm() {
  const registerSchema = zodUserSchema.pick({
    email: true,
    username: true,
    nohp: true,
    password: true,
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      nohp: "",
      password: "",
    },
  });

  const formHandler = async (data: z.infer<typeof registerSchema>) => {
    toast.promise(Regis(data), {
      loading: "Loading...",
      success:
        "Pendaftaran Berhasil! Harap tunggu konfirmasi lebih lanjut dari admin.",
      error: (e: Error) => e.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formHandler)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nohp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No HP</FormLabel>
              <FormControl>
                <div className="relative block">
                  <small className="absolute inset-y-0 left-3 flex items-center font-normal text-muted-foreground">
                    +62
                  </small>
                  <Input
                    type="number"
                    placeholder="Masukkan No Hp"
                    className="pl-12"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Masukkan Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2 gap-x-2">
          <LogIn size={iconSize.base} />
          Registasi ke Omar Archives
        </Button>
      </form>
    </Form>
  );
}

export function UpdateProfileForm({ data }: { data: UserCredentials }) {
  const schema = zodUserSchema.pick({
    username: true,
    nohp: true,
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: data.username, nohp: data.nohp },
  });

  const formHandler = async (formData: z.infer<typeof schema>) => {
    const { username, nohp } = formData;

    toast.promise(UpdateProfile(data.id_user, username, nohp), {
      loading: "Loading...",
      success: async () => {
        await SignOutHandler();
        return "Profile Berhasil Diperbarui.";
      },
      error: (e: Error) => e.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formHandler)}
        className="flex flex-col gap-y-2"
      >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={data.email}
              disabled
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Status</Label>
            <Input
              id="role"
              name="role"
              type="text"
              placeholder="Status"
              defaultValue={Capitalize(data.role)}
              disabled
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nohp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No HP</FormLabel>
                <FormControl>
                  <div className="relative block">
                    <small className="absolute inset-y-0 left-3 flex items-center font-normal text-muted-foreground">
                      +62
                    </small>
                    <Input
                      type="number"
                      placeholder="No Hp"
                      className="pl-12"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button size="sm" type="submit" className="mt-2 w-fit">
          Simpan Perubahan
        </Button>
      </form>
    </Form>
  );
}

export function UpdatePasswordForm({ id }: { id: string }) {
  const [confirmPass, setConfirmPass] = useState<string>("");
  const schema = zodUserSchema.pick({ password: true });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  const formHandler = async (data: z.infer<typeof schema>) => {
    const { password } = data;

    if (password !== confirmPass) toast.error("Password Tidak Sama!");
    else {
      toast.promise(UpdatePassword(id, password), {
        loading: "Loading...",
        success: async () => {
          await SignOutHandler();
          return "Password Telah Berhasil Diperbarui.";
        },
        error: (e: Error) => e.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formHandler)}
        className="flex flex-col gap-y-2"
      >
        <div className="flex flex-col gap-x-4 gap-y-2 lg:flex-row">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan Password Baru"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="basis-1/2 space-y-1">
            <Label htmlFor="confirmPass">Konfirmasi Password Baru</Label>
            <Input
              id="confirmPass"
              name="confirmPass"
              type="password"
              placeholder="Konfirmasi Password Baru"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </div>

        <Button size="sm" type="submit" className="mt-2 w-fit">
          Ubah Password
        </Button>
      </form>
    </Form>
  );
}
