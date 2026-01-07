"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import logo from "../public/assets/Stack-Logo.png";
import { Search } from "lucide-react";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  // Mock user for UI development if Redux not ready
  const [User, setUser] = useState<any>(null);
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
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/60 backdrop-blur-md rounded-full border border-gray-200 px-4 py-3 flex items-center justify-between gap-8 w-[90%] md:w-[65%] transition-all"
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#ef8236]">DV</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/home"
          className="text-gray-600 hover:text-black font-medium text-sm transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/#about"
          className="text-gray-600 hover:text-black font-medium text-sm transition-colors"
        >
          About
        </Link>
        <Link
          href="/#features"
          className="text-gray-600 hover:text-black font-medium text-sm transition-colors"
        >
          Features
        </Link>
      </div>

      <div className="flex items-center">
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
                href={`/Users/${User?.result?._id}`}
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
