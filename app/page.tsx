"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Capsule from "@/components/Capsule";
import {
  Search,
  Globe,
  MessageSquare,
  Zap,
  Users,
  Shield,
  Code,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-[#ef8236] selection:text-white">
      {/* Hero Section - Full Viewport */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-col items-center justify-center text-center px-4 w-full h-[calc(100vh-50px)] min-h-[600px] gap-6"
      >
        <motion.div variants={fadeInUp}>
          <Capsule title="Introducing questions" variant="secondary" />
        </motion.div>
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold text-foreground tracking-tight max-w-5xl"
        >
          <span className="text-foreground">Devampire</span> - The Developer
          Community
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          A public platform building the definitive collection of coding
          questions & answers. Join the community to learn, share, and build
          your career.
        </motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/auth">
            <Button className="h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all">
              Join Community
            </Button>
          </Link>
          <Link href="/home">
            <Button
              variant="outline"
              className="h-12 px-8 text-base border-input bg-background hover:bg-accent hover:text-accent-foreground text-foreground rounded-full"
            >
              Explore Questions
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* About Section - Bento Grid */}
      <section id="about" className="py-24 px-4 w-full bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center text-center mb-16 gap-4"
          >
            <Capsule title="Our Mission" variant="secondary" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Why developers love us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              We provide the tools and community you need to solve problems and advance your career.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]"
          >
            {/* Large Card */}
            <motion.div
              variants={fadeInUp}
              className="md:col-span-2 md:row-span-2 bg-[#fdf7e2] dark:bg-card border border-transparent dark:border-border dark:hover:border-foreground/50 rounded-3xl p-10 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300"
            >
              <div>
                <div className="bg-primary dark:bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-primary-foreground dark:text-primary">
                  <Globe size={28} />
                </div>
                <h3 className="text-3xl font-bold text-[#2d2d2d] dark:text-foreground mb-4">
                  A Global Knowledge Base
                </h3>
                <p className="text-lg text-gray-700 dark:text-muted-foreground leading-relaxed max-w-md">
                  Access millions of questions and answers. From fixing simple
                  bugs to architecting complex systems, the collective wisdom of
                  the community is at your fingertips.
                </p>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden bg-white/50 dark:bg-muted/30 h-48 border border-border/10 dark:border-border flex items-center justify-center">
                <div className="text-foreground font-mono text-sm p-4 bg-white dark:bg-card dark:text-foreground rounded-lg shadow-sm">
                  console.log("Hello, World!");
                </div>
              </div>
            </motion.div>

            {/* Tall Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#e7f8fe] dark:bg-card border border-transparent dark:border-border dark:hover:border-foreground/50 rounded-3xl p-8 flex flex-col justify-start hover:scale-[1.01] transition-all duration-300"
            >
              <div className="bg-[#009dff] dark:bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white dark:text-blue-500">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2d2d2d] dark:text-foreground mb-2">
                Collaborative
              </h3>
              <p className="text-gray-600 dark:text-muted-foreground">
                Work together to solve the toughest problems in tech.
              </p>
            </motion.div>

            {/* Wide Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#2d2d2d] dark:bg-card border border-transparent dark:border-border dark:hover:border-foreground/50 rounded-3xl p-8 flex flex-col justify-start text-white hover:scale-[1.01] transition-all duration-300"
            >
              <div className="bg-gray-700 dark:bg-muted w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white dark:text-foreground">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white dark:text-foreground">Career Acceleration</h3>
              <p className="text-gray-400 dark:text-muted-foreground">
                Build your reputation and get noticed by top companies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* Features Section */}
      < section id="features" className="py-24 px-4 w-full" >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center text-center mb-16 gap-4"
          >
            <Capsule title="Core Features" variant="secondary" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Everything you need to ask, answer, and grow.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: MessageSquare,
                title: "Q&A System",
                desc: "Robust asking and answering with markdown support.",
                color: "text-blue-500",
                bg: "bg-blue-50 dark:bg-blue-500/10",
              },
              {
                icon: Shield,
                title: "Moderation",
                desc: "Community-driven moderation ensures high content quality.",
                color: "text-green-500",
                bg: "bg-green-50 dark:bg-green-500/10",
              },
              {
                icon: Zap,
                title: "Reputation",
                desc: "Earn points and badges for helpful contributions.",
                color: "text-yellow-500",
                bg: "bg-yellow-50 dark:bg-yellow-500/10",
              },
              {
                icon: Code,
                title: "Syntax Highlighting",
                desc: "Beautiful code rendering for dozens of languages.",
                color: "text-purple-500",
                bg: "bg-purple-50 dark:bg-purple-500/10",
              },
              {
                icon: Lightbulb,
                title: "Tags",
                desc: "Organize knowledge with a comprehensive tagging system.",
                color: "text-orange-500",
                bg: "bg-orange-50 dark:bg-orange-500/10",
              },
              {
                icon: Search,
                title: "Powerful Search",
                desc: "Find exactly what you're looking for instantly.",
                color: "text-red-500",
                bg: "bg-red-50 dark:bg-red-500/10",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-card p-8 rounded-2xl border border-border hover:border-foreground/50 transition-all duration-300 group"
              >
                <div
                  className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* Join Section */}
      < section className="py-24 px-4" >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-[95%] md:w-[70%] mx-auto bg-[#0f0f0f] dark:bg-white rounded-full md:rounded-full py-8 md:py-24 px-6 flex flex-col items-center justify-center gap-6 text-center overflow-hidden transition-colors duration-300"
        >
          {/* Pill Label */}
          <div className="bg-white/20 dark:bg-black/10 px-6 py-1 rounded-full">
            <span className="text-sm font-semibold text-white dark:text-black tracking-wide">
              Grow together
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl text-white dark:text-black tracking-tight font-semibold">
            Join community today
          </h2>

          {/* Button */}
          <Link href="/auth">
            <Button className="h-14 md:h-16 px-8 md:px-10 rounded-full bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800 text-md md:text-lg transition-all hover:scale-105 font-bold cursor-pointer">
              Join Community
            </Button>
          </Link>
        </motion.div>
      </section >

      {/* Footer Section */}
      < footer className="bg-background text-muted-foreground py-6 px-6 border-t border-border" >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="text-gray-500 font-sans text-md">
            <p>Design and developed by Beyond Zero</p>
          </div>
        </div>
      </footer >
    </div >
  );
}
