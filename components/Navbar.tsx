"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import logo from "../public/assets/Stack-Logo.png";
import { Search, Sun, Moon } from "lucide-react";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Navbar = () => {
  // Mock user for UI development if Redux not ready
  const [User, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/");
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("Profile");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("Profile");
      if (profile) setUser(JSON.parse(profile));
    }
  }, []);

  if (pathname === '/auth') return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-background/60 backdrop-blur-md rounded-full border border-border px-4 py-3 flex items-center justify-between gap-8 w-[90%] md:w-[65%] transition-all"
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-foreground">DV</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/home"
          className="text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/#about"
          className="text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
        >
          About
        </Link>
        <Link
          href="/#features"
          className="text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
        >
          Features
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        {User === null ? (
          <Link href="/auth">
            <Button variant="outline" className="rounded-full h-9 px-6 text-sm">
              Log in
            </Button>
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="5px"
              borderRadius="50%"
              color="white"
              cursor="pointer"
            >
              <Link
                href={`/users/${User?.result?._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <Button
              variant="outline"
              className="ml-3 rounded-full h-9 px-4 text-sm"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
