"use client";

import { Home, UtensilsCrossed, Wine, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useMemo } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Menu", icon: UtensilsCrossed, href: "/food" },
  { label: "Drinks", icon: Wine, href: "/drinks" },
  { label: "Cart", icon: ShoppingBag, href: "/cart" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isItemPage = pathname.startsWith("/item/");

  // Hide on item detail page (has its own bottom action bar)
  if (isItemPage) return null;

  const activeIndex = useMemo(() => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/food")) return 1;
    if (pathname.startsWith("/drinks")) return 2;
    if (pathname.startsWith("/cart")) return 3;
    return 0;
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto z-50 bg-[#0a0a0c]/85 backdrop-blur-xl border-t border-white/[0.06]">
      <div className="relative flex items-center justify-around px-2 h-[76px] pb-safe">
        {/* Animated pill indicator */}
        <motion.div
          className="absolute top-2 h-[44px] rounded-2xl bg-[#E60000]/10 border border-[#E60000]/20"
          style={{ width: `${100 / NAV_ITEMS.length - 4}%` }}
          animate={{
            x: `calc(${activeIndex * 100}% + ${activeIndex * 16}px)`,
            left: '2%'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === activeIndex;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative z-10 flex flex-col items-center justify-center flex-1 py-2 group"
            >
              <Icon
                className={`w-[20px] h-[20px] mb-1 transition-colors duration-200 ${
                  isActive ? "text-[#E60000]" : "text-white/30 group-hover:text-white/60"
                }`}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span
                className={`text-[9px] font-bold tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? "text-[#E60000]" : "text-white/30 group-hover:text-white/60"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
