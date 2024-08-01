import { Providers } from "@/components";
import type { Metadata } from "next";
import { inter } from "../config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s -  Teslo | shop",
    default: "Home Teslo | shop",
  },
  description: "Store online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
