"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { RedirectHandler } from "@/server/action";
import { Check, Regis } from "@/server/action-user";

import { z } from "zod";
import { zodUserSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
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

        <Button type="submit" className="mt-4 gap-x-2" disabled={isLoad}>
          {isLoad ? (
            <CustomLoader customType="circle" size={iconSize.base} />
          ) : (
            <LogIn size={iconSize.base} />
          )}
          {isLoad ? "Logging In..." : "Masuk ke D'Kosan Portofolio"}
        </Button>
      </form>
    </Form>
  );
}

export function RegisForm() {
  const registerSchema = zodUserSchema.pick({
    email: true,
    username: true,
    password: true,
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
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
        className="flex w-full flex-col gap-y-2"
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
          Registasi ke D&apos;Kosan Portofolio
        </Button>
      </form>
    </Form>
  );
}
