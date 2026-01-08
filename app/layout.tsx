import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devampire - Where Developers Grow & Share",
  description:
    "Join Devampire to ask questions, share knowledge, and build your career. A community-driven platform for developers to solve problems and advance their skills.",
  keywords: [
    "developer",
    "coding",
    "programming",
    "web development",
    "react",
    "nextjs",
    "community",
  ],
  openGraph: {
    title: "Devampire - Where Developers Grow & Share",
    description:
      "Join the definitive collection of coding questions & answers. Learn, share, and build your career.",
    url: "https://devampire.vercel.app",
    siteName: "Devampire",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Devampire Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devampire - Where Developers Grow & Share",
    description:
      "Join the definitive collection of coding questions & answers. Learn, share, and build your career.",
    images: ["/Logo.png"],
  },
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased pt-12 font-[family-name:Open_Sans,sans-serif]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
