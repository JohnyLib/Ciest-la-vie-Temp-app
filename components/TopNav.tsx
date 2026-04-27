"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const isItemPage = pathname.startsWith("/item/");

  if (isItemPage) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full max-w-md mx-auto z-50 px-6 py-4 flex items-center justify-center bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/[0.04]"
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#E60000] flex items-center justify-center shadow-[0_0_20px_rgba(230,0,0,0.3)]">
          <span className="text-white text-[10px] font-bold font-serif">C</span>
        </div>
        <h1 className="font-serif font-bold text-white text-lg tracking-tight leading-none">
          C&apos;est la vie
        </h1>
      </Link>
    </motion.nav>
  );
}
