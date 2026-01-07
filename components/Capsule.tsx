import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface CapsuleProps {
  title: string;
  href?: string;
  variant?: "primary" | "secondary";
}

const Capsule: React.FC<CapsuleProps> = ({ title, href, variant = "primary" }) => {
  const styles =
    variant === "secondary"
      ? "border-[#ef8236] text-[#ef8236] hover:bg-[#ef8236]/5"
      : "border-black/60 text-black/80 hover:bg-black/5";

  const content = (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-medium mb-4 transition-colors ${styles}`}>
      {title}
      {href && <ArrowRight size={14} />}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-medium mb-4 transition-colors ${styles}`}>
      {title}
    </div>
  );
};

export default Capsule;
