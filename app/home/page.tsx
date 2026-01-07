"use client";

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import HomeMainbar from "@/components/HomeMainbar";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Sparkles, Plus, CheckCircle2, Mic, Clock, Trophy } from "lucide-react";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

export default function Home() {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* <LeftSidebar /> */}

            <div className="w-full max-w-6xl mx-auto p-4 md:p-6 pb-20">
                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col items-center text-center py-12 md:py-16 gap-6 mb-8 border-b border-gray-100 pb-12"
                >
                    <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] tracking-tight">
                            Developer Questions
                        </h1>
                        <p className="text-xl text-gray-500 font-light max-w-2xl">
                            Browse, ask, and learn from the community's collective knowledge.
                        </p>
                    </motion.div>
                </motion.section>

                {/* Content Area (Feed) */}
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-4xl">
                        <HomeMainbar />
                        {/* <RightSidebar /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
