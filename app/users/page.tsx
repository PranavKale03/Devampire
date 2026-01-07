"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllUsers } from "../../lib/api";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchAllUsers();
        if (data && data.allUserDetails) {
          setUsers(data.allUserDetails);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 pb-20 md:mt-20">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center py-12 md:py-16 gap-6 mb-8 border-b border-border pb-12"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Community Members
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl">
              Meet the developers asking and answering questions.
            </p>
          </motion.div>
        </motion.section>


        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <Card className="border-border bg-card p-0">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-500">
              <p>Failed to load users. Please try again later.</p>
            </div>
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <div key={user._id}>
                <Link href={`/users`}>
                  <Card className="hover:shadow-md transition-shadow border-border bg-card p-0 hover:border-primary">
                    <CardContent className="flex items-center gap-4 p-6">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src="" /> {/* Add image if available */}
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-foreground">
                          {user.name || "Unknown User"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Joined {moment(user.joinedOn).format("D MMM YYYY")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No users found in the community yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
