"use client";

import PageWrapper from "@/components/PageWrapper";
import { drinksMenu } from "@/lib/data";
import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const FILTERS = ["Craft Beers", "Classic Cocktails", "Non-Alcoholic"];

export default function DrinksMenuPage() {
  const [activeFilter, setActiveFilter] = useState("Craft Beers");
  const handleFilter = useCallback((f: string) => setActiveFilter(f), []);

  return (
    <PageWrapper className="bg-[#0a0a0c]">

      {/* Header */}
      <motion.div className="pt-24 px-6 pb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-[#C5A059] text-[9px] font-bold tracking-[0.25em] uppercase mb-2">Craft & Classic</p>
        <h1 className="text-4xl font-serif italic text-white mb-2">Libations</h1>
        <p className="text-white/30 text-xs tracking-wider leading-relaxed max-w-[300px]">
          A meticulously curated selection of craft beers, cocktails, and refined provisions.
        </p>
      </motion.div>

      {/* Sticky Filters */}
      <div className="sticky top-[56px] z-40 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/[0.04] px-6 py-3">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-0.5">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                activeFilter === filter
                  ? "bg-[#C5A059] text-black shadow-[0_2px_12px_rgba(197,160,89,0.3)]"
                  : "bg-white/[0.04] text-white/50 hover:text-white/70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 px-6 pt-8 pb-10">
        <AnimatePresence mode="wait">
          {activeFilter === "Craft Beers" && (
            <motion.section key="beers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

              {/* Featured Beer Cards */}
              <div className="flex flex-col gap-5 mb-10">
                {drinksMenu.craftBeers.map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.08 }}>
                    <Link href={`/item/${item.id}`} className="flex flex-col gap-4 p-4 bg-[#141618] border border-white/[0.04] rounded-[22px] hover:border-white/[0.08] transition-all group">
                      <motion.div layoutId={`item-image-${item.id}`} className="w-full h-40 relative rounded-2xl overflow-hidden bg-white/5">
                        <Image src={item.image} alt={item.title} fill className="object-cover mask-image-ltr" referrerPolicy="no-referrer" sizes="400px" loading="lazy" />
                      </motion.div>
                      <div className="w-full flex flex-col">
                        <span className="text-[#C5A059] font-bold tracking-[0.2em] text-[9px] uppercase mb-1">{item.tag}</span>
                        <motion.h3 layoutId={`item-title-${item.id}`} className="text-xl font-serif italic text-white mb-1.5">{item.title}</motion.h3>
                        <p className="text-white/35 text-[11px] leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex justify-end">
                          <span className="text-[#C5A059] text-lg font-mono">${item.price}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Draft Selection */}
              <div className="bg-[#141618] border border-white/[0.04] rounded-[22px] p-6 mb-5">
                <h4 className="text-[#C5A059] font-bold text-[10px] tracking-[0.2em] mb-5 uppercase">Draft Selection</h4>
                <div className="flex flex-col gap-4">
                  {drinksMenu.draftSelection.map(item => (
                    <Link key={item.id} href={`/item/${item.id}`} className="group flex items-baseline justify-between p-2 -mx-2 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <div className="pr-4">
                        <h5 className="text-white font-serif italic text-base mb-0.5 group-hover:text-[#C5A059] transition-colors">{item.name}</h5>
                        <p className="text-white/30 text-[10px]">{item.desc}</p>
                      </div>
                      <div className="flex-1 border-b border-white/[0.06] mx-2 relative top-[-5px]" />
                      <span className="text-[#C5A059] font-mono text-base pl-4">${item.price}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottle Collection */}
              <div className="bg-[#141618] border border-white/[0.04] rounded-[22px] p-6">
                <h4 className="text-[#C5A059] font-bold text-[10px] tracking-[0.2em] mb-5 uppercase">Bottle & Can Collection</h4>
                <div className="flex flex-col gap-4">
                  {drinksMenu.bottleCollection.map(item => (
                    <Link key={item.id} href={`/item/${item.id}`} className="group flex items-baseline justify-between p-2 -mx-2 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <div className="pr-4">
                        <h5 className="text-white font-serif italic text-base mb-0.5 group-hover:text-[#C5A059] transition-colors">{item.name}</h5>
                        <p className="text-white/30 text-[10px]">{item.desc}</p>
                      </div>
                      <div className="flex-1 border-b border-white/[0.06] mx-2 relative top-[-5px]" />
                      <span className="text-[#C5A059] font-mono text-base pl-4">${item.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeFilter === "Classic Cocktails" && (
            <motion.div key="cocktails" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-white/20 text-xs tracking-widest uppercase">Coming Soon</p>
              <h3 className="text-xl font-serif italic text-white/50 mt-2">Classic Cocktails</h3>
            </motion.div>
          )}

          {activeFilter === "Non-Alcoholic" && (
            <motion.div key="nonalc" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-white/20 text-xs tracking-widest uppercase">Coming Soon</p>
              <h3 className="text-xl font-serif italic text-white/50 mt-2">Non-Alcoholic</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center text-center pb-10 mx-6">
        <div className="w-20 h-px bg-white/[0.06] mb-6" />
        <p className="text-white/20 text-[9px] uppercase tracking-widest">© 2024 C&apos;est la vie</p>
      </div>
    </PageWrapper>
  );
}
