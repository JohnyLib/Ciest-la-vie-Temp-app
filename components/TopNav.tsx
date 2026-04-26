"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="fixed top-0 w-full max-w-md mx-auto z-50 px-6 py-4 flex items-center justify-between bg-[#121212] border-b border-[#222]">
      <button className="flex items-center justify-center text-white/70 hover:text-white transition-colors" aria-label="Menu">
        <Menu className="w-5 h-5" />
      </button>
      
      <Link href="/" className="flex-1 flex justify-center">
        <h1 className="font-serif font-bold text-white text-xl tracking-tight leading-none drop-shadow-md">
          C'est la vie
        </h1>
      </Link>
      
      <button className="flex items-center justify-center text-[11px] font-bold tracking-widest text-[#E60000] hover:text-[#ff3333] transition-colors">
        EN
      </button>
    </nav>
  );
}
