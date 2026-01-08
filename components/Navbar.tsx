"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

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

  const handleProfileUpdate = () => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("Profile");
      if (profile) {
        setUser(JSON.parse(profile));
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    handleProfileUpdate();

    if (typeof window !== "undefined") {
      window.addEventListener('profile-updated', handleProfileUpdate);
      // Also listen for storage events (for multi-tab support)
      window.addEventListener('storage', handleProfileUpdate);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('profile-updated', handleProfileUpdate);
        window.removeEventListener('storage', handleProfileUpdate);
      }
    };
  }, []);

  if (pathname === '/auth') return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20, mass: 1 }}
      className="fixed top-4 md:top-10 left-1/2 transform -translate-x-1/2 z-50 bg-background/60 backdrop-blur-md rounded-full border border-border px-4 py-3 flex items-center justify-between gap-8 w-[90%] md:w-[65%]"
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Devampire Logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/dashboard"
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
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div role="button" tabIndex={0} className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={User?.result?.picture} alt={User?.result?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {User?.result?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{User?.result?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {User?.result?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard" className="w-full md:hidden">
                  <DropdownMenuItem className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={`/users`} className="w-full">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 text-destructive" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
