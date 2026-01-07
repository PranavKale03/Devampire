import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Devampire",
  description: "A Stack Overflow clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased pt-12`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
