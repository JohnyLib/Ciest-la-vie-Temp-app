"use client";

import PageWrapper from "@/components/PageWrapper";
import { fullMenu, categories } from "@/lib/data";
import { Scale } from "lucide-react";
import Image from "next/image";
import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const MenuCard = memo(function MenuCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link href={`/item/${item.id}`} className="block bg-[#141618] rounded-[22px] overflow-hidden group border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
        <div className="w-full h-[200px] relative overflow-hidden">
          <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" referrerPolicy="no-referrer" sizes="400px" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-60" />
          {item.weight > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white/80 font-medium">
              <Scale className="w-3 h-3" />{item.weight}g
            </div>
          )}
        </div>
        <div className="p-5">
          {item.tags?.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {item.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-white/40 text-[9px] font-bold uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          )}
          <h3 className="text-lg font-serif font-bold text-white mb-1.5 leading-tight">{item.title}</h3>
          <p className="text-[11px] text-white/35 leading-relaxed mb-4 line-clamp-2">{item.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-serif font-bold text-[#E60000]">{item.priceLei}</span>
            <span className="text-[10px] text-white/25">{item.priceEur}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default function FoodMenuPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilter = useCallback((id: string) => setActiveFilter(id), []);
  const totalCount = categories.reduce((s, c) => s + c.count, 0);

  return (
    <PageWrapper className="bg-[#0a0a0c]">
      <motion.div className="flex flex-col items-center text-center pt-24 pb-6 px-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-[#E60000] text-[9px] font-bold tracking-[0.25em] uppercase mb-2">{totalCount} Dishes</p>
        <h1 className="text-4xl font-serif font-bold text-white mb-2 leading-[1.1] tracking-tight">Our Menu</h1>
        <p className="text-white/30 text-xs tracking-wider max-w-[260px] leading-relaxed">Curated dishes from our finest chefs</p>
      </motion.div>

      <div className="sticky top-[56px] z-40 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/[0.04] px-6 py-3">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide snap-x pb-0.5">
          <button onClick={() => handleFilter("all")} className={`whitespace-nowrap snap-start px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${activeFilter === "all" ? "bg-[#E60000] text-white shadow-[0_2px_12px_rgba(230,0,0,0.3)]" : "bg-white/[0.04] text-white/50 hover:text-white/70"}`}>
            Все ({totalCount})
          </button>
          {categories.map(f => (
            <button key={f.id} onClick={() => handleFilter(f.id)} className={`whitespace-nowrap snap-start px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${activeFilter === f.id ? "bg-[#E60000] text-white shadow-[0_2px_12px_rgba(230,0,0,0.3)]" : "bg-white/[0.04] text-white/50 hover:text-white/70"}`}>
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 pt-8 pb-10">
        <AnimatePresence mode="popLayout">
          {categories.map(cat => {
            if (activeFilter !== "all" && activeFilter !== cat.id) return null;
            return (
              <motion.section key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-serif font-bold text-white whitespace-nowrap">{cat.label}</h2>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[10px] text-white/25 font-bold">{cat.count}</span>
                </div>
                <div className="flex flex-col gap-5">
                  {fullMenu[cat.id].map((item: any, idx: number) => <MenuCard key={item.id} item={item} index={idx} />)}
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-col items-center text-center pb-8 border-t border-white/[0.04] pt-10 mx-6">
        <h4 className="text-base font-serif font-bold mb-1 text-white">C&apos;est la vie</h4>
        <p className="text-[9px] text-white/20 tracking-widest uppercase mb-6">Elite Culinary Experience</p>
        <p className="text-[9px] text-white/15">© 2024 C&apos;est la vie</p>
      </div>
    </PageWrapper>
  );
}
