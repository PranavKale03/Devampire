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
      ? "border-border text-foreground hover:bg-muted/50"
      : "border-border text-muted-foreground hover:bg-muted/50";

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
