"use client";

import { Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // For testing purposes based on the image, the active item is Search
  // So we'll force the active state logic
  const navItems = [
    { label: "HOME", icon: Home, href: "/" },
    { label: "SEARCH", icon: Search, href: "/food" }, // Route to food for this demo as per image
    { label: "CART", icon: ShoppingBag, href: "/cart" },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto h-[70px] bg-[#0E0E0E] border-t border-white/5 z-50 flex flex-col justify-center pb-safe">
      <div className="flex items-center justify-around px-4 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)); 
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-[80px] py-1.5 rounded-full transition-colors ${
                isActive ? "bg-[#3A0A0A]" : "bg-transparent hover:bg-white/5"
              }`}
            >
              <Icon 
                className={`w-5 h-5 mb-1 ${isActive ? "text-[#E60000]" : "text-white/40"}`} 
                strokeWidth={2} 
              />
              <span className={`text-[9px] font-bold tracking-widest ${isActive ? "text-[#E60000]" : "text-white/40"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
