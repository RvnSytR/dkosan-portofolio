import { Metadata } from "next";
import { LoginForm, RegisForm } from "@/components/layout/auth-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { copyrightLabel } from "@/components/content";

export const metadata: Metadata = {
  title: "Omar Archives",
};

export default function Page() {
  return (
    <main className="container flex min-h-dvh items-center justify-center">
      <Tabs defaultValue="login" className="w-full md:w-2/4 lg:w-1/3">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Masuk</TabsTrigger>
          <TabsTrigger value="register">Registrasi</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Omar Archives</CardTitle>
              <CardDescription className="text-center">
                Silakan masukkan email dan password akun Omar Anda di bawah ini
                untuk mengakses Omar Archives.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-4">
              <Separator />

              <LoginForm />

              <Separator className="mt-2" />
            </CardContent>

            <CardFooter>
              <small className="text-center">{copyrightLabel}</small>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="rounded-none md:rounded-md">
            <CardHeader>
              <CardTitle className="text-center">
                Registrasi Omar Archives
              </CardTitle>
              <CardDescription className="text-center">
                Masukkan detail Anda dibawah ini untuk membuat akun Omar Achives
                Anda.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-4">
              <Separator />

              <RegisForm />

              <Separator className="mt-2" />
            </CardContent>

            <CardFooter>
              <small className="text-center">{copyrightLabel}</small>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
