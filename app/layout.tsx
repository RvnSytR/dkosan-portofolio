import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
// import { Protector } from "@/components/protector";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DKOSAN",
  description: "DKOSAN - The sSecond Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Protector>{children}</Protector> */}
          {children}
          <Toaster position="top-center" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
