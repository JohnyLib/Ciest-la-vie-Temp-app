"use client";

import PageWrapper from "@/components/PageWrapper";
import { drinksMenu } from "@/lib/data";
import Image from "next/image";
import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// Restructure drinks data into food-page format
const drinkCategories = [
  { id: "craft", label: "Craft Beers", count: drinksMenu.craftBeers.length },
  { id: "draft", label: "Draft Selection", count: drinksMenu.draftSelection.length },
  { id: "bottle", label: "Bottle & Can", count: drinksMenu.bottleCollection.length },
];

const drinkItems: Record<string, any[]> = {
  craft: drinksMenu.craftBeers.map(b => ({
    id: b.id, title: b.title, description: b.description,
    price: `$${b.price}`, tag: b.tag, image: b.image,
  })),
  draft: drinksMenu.draftSelection.map(d => ({
    id: d.id, title: d.name, description: d.desc,
    price: `$${d.price}`, tag: "", image: d.image,
  })),
  bottle: drinksMenu.bottleCollection.map(b => ({
    id: b.id, title: b.name, description: b.desc,
    price: `$${b.price}`, tag: "", image: b.image,
  })),
};

const totalDrinks = drinkCategories.reduce((s, c) => s + c.count, 0);

const DrinkCard = memo(function DrinkCard({ item, index }: { item: any; index: number }) {
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
          {item.tag && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#C5A059]/20 backdrop-blur-md text-[10px] text-[#C5A059] font-bold uppercase tracking-wider">
              {item.tag}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-serif font-bold text-white mb-1.5 leading-tight">{item.title}</h3>
          <p className="text-[11px] text-white/35 leading-relaxed mb-4 line-clamp-2">{item.description}</p>
          <span className="text-lg font-serif font-bold text-[#C5A059]">{item.price}</span>
        </div>
      </Link>
    </motion.div>
  );
});

export default function DrinksMenuPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilter = useCallback((f: string) => setActiveFilter(f), []);

  return (
    <PageWrapper className="bg-[#0a0a0c]">
      <motion.div className="flex flex-col items-center text-center pt-24 pb-6 px-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-[#C5A059] text-[9px] font-bold tracking-[0.25em] uppercase mb-2">{totalDrinks} Drinks</p>
        <h1 className="text-4xl font-serif font-bold text-white mb-2 leading-[1.1] tracking-tight">Libations</h1>
        <p className="text-white/30 text-xs tracking-wider max-w-[260px] leading-relaxed">Craft beers, draft selection & fine bottles</p>
      </motion.div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[56px] z-40 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/[0.04] px-6 py-3">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide snap-x pb-0.5">
          <button onClick={() => handleFilter("all")} className={`whitespace-nowrap snap-start px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${activeFilter === "all" ? "bg-[#C5A059] text-black shadow-[0_2px_12px_rgba(197,160,89,0.3)]" : "bg-white/[0.04] text-white/50 hover:text-white/70"}`}>
            All ({totalDrinks})
          </button>
          {drinkCategories.map(f => (
            <button key={f.id} onClick={() => handleFilter(f.id)} className={`whitespace-nowrap snap-start px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${activeFilter === f.id ? "bg-[#C5A059] text-black shadow-[0_2px_12px_rgba(197,160,89,0.3)]" : "bg-white/[0.04] text-white/50 hover:text-white/70"}`}>
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-14 px-6 pt-8 pb-10">
        <AnimatePresence mode="popLayout">
          {drinkCategories.map(cat => {
            if (activeFilter !== "all" && activeFilter !== cat.id) return null;
            return (
              <motion.section key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-serif font-bold text-white whitespace-nowrap">{cat.label}</h2>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[10px] text-white/25 font-bold">{cat.count}</span>
                </div>
                <div className="flex flex-col gap-5">
                  {drinkItems[cat.id].map((item: any, idx: number) => <DrinkCard key={item.id} item={item} index={idx} />)}
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-col items-center text-center pb-8 border-t border-white/[0.04] pt-10 mx-6">
        <h4 className="text-base font-serif font-bold mb-1 text-white">C&apos;est la vie</h4>
        <p className="text-[9px] text-white/20 tracking-widest uppercase mb-6">Craft & Classic</p>
        <p className="text-[9px] text-white/15">© 2024 C&apos;est la vie</p>
      </div>
    </PageWrapper>
  );
}
