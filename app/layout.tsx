import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased pt-12 font-[family-name:Open_Sans,sans-serif]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
