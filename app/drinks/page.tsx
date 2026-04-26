"use client";

import PageWrapper from "@/components/PageWrapper";
import { drinksMenu } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const FILTERS = ["Craft Beers", "Classic Cocktails", "Non-Alcoholic"];

export default function DrinksMenuPage() {
  const [activeFilter, setActiveFilter] = useState("Craft Beers");

  return (
    <PageWrapper className="px-6 pt-24">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-serif italic text-white mb-2">
          Libations
        </h1>
        <p className="text-white/40 text-xs tracking-widest leading-relaxed mb-8 uppercase">
          A meticulously curated selection of craft beers, classic cocktails, and refined non-alcoholic provisions.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide -mx-6 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeFilter === filter 
                ? "bg-[#C5A059] text-black" 
                : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="flex flex-col gap-10 pb-10">
        
        {/* Craft Beers Selected */}
        {(activeFilter === "Craft Beers") && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-serif italic text-[#C5A059] mb-4 pb-2 border-b border-white/5">
              Craft Beers
            </h2>
            
            {/* Beer Cards */}
            <div className="flex flex-col gap-6 mb-10">
              {drinksMenu.craftBeers.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                >
                  <Link href={`/item/${item.id}`} className="flex flex-col gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-colors group">
                    <motion.div layoutId={`item-image-${item.id}`} className="w-full h-40 relative rounded-2xl overflow-hidden bg-white/5 group-hover:border-[#C5A059]/30 border border-transparent transition-colors">
                      <Image src={item.image} alt={item.title} fill className="object-cover mask-image-ltr" referrerPolicy="no-referrer" />
                    </motion.div>
                    
                    <div className="relative z-10 w-full flex flex-col justify-between">
                      <div>
                        <div className="text-[#C5A059] font-bold tracking-[0.2em] text-[10px] uppercase mb-1">
                          {item.tag}
                        </div>
                        <motion.h3 layoutId={`item-title-${item.id}`} className="text-xl font-serif italic text-white mb-2">{item.title}</motion.h3>
                        <p className="text-white/40 text-[11px] leading-relaxed mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <span className="text-[#C5A059] text-lg font-mono">${item.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* List Selection Boxes */}
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out fill-mode-both" style={{ animationDelay: '600ms' }}>
              
              {/* Draft Selection */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                <h4 className="text-[#C5A059] font-bold text-xs tracking-[0.2em] mb-6 uppercase">Draft Selection</h4>
                <div className="flex flex-col gap-5">
                  {drinksMenu.draftSelection.map((item, id) => (
                    <Link key={item.id} href={`/item/${item.id}`} className="relative block group hover:bg-white/[0.03] p-2 -mx-2 rounded-xl transition-colors">
                      <div className="flex items-baseline justify-between w-full relative z-10">
                        <div className="pr-4 bg-[#1a1c20]/0">
                          <h5 className="text-white font-serif italic text-lg mb-0.5 group-hover:text-[#C5A059] transition-colors">{item.name}</h5>
                          <p className="text-white/40 text-[11px] group-hover:text-white/60 transition-colors">{item.desc}</p>
                        </div>
                        <div className="flex-1 border-b border-white/10 mx-2 relative top-[-6px] opacity-40 group-hover:border-[#C5A059]/30 transition-colors"></div>
                        <div className="pl-4 bg-[#1a1c20]/0">
                           <span className="text-[#C5A059] font-mono text-lg">${item.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottle & Can Collection */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                <h4 className="text-[#C5A059] font-bold text-xs tracking-[0.2em] mb-6 uppercase">Bottle & Can Collection</h4>
                <div className="flex flex-col gap-5">
                  {drinksMenu.bottleCollection.map((item, id) => (
                    <Link key={item.id} href={`/item/${item.id}`} className="relative block group hover:bg-white/[0.03] p-2 -mx-2 rounded-xl transition-colors">
                      <div className="flex items-baseline justify-between w-full relative z-10">
                        <div className="pr-4 bg-[#1a1c20]/0">
                          <h5 className="text-white font-serif italic text-lg mb-0.5 group-hover:text-[#C5A059] transition-colors">{item.name}</h5>
                          <p className="text-white/40 text-[11px] group-hover:text-white/60 transition-colors">{item.desc}</p>
                        </div>
                        <div className="flex-1 border-b border-white/10 mx-2 relative top-[-6px] opacity-40 group-hover:border-[#C5A059]/30 transition-colors"></div>
                        <div className="pl-4 bg-[#1a1c20]/0">
                           <span className="text-[#C5A059] font-mono text-lg">${item.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </motion.section>
        )}

      </div>
      
      {/* Design Accents / Footer */}
      <div className="mt-16 flex flex-col items-center text-center pb-12">
        <p className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.3em] mb-4">Concept Studio</p>
        <h4 className="text-2xl font-serif italic mb-2 text-white">Paris • Lyon</h4>
        <div className="w-24 h-px bg-[#C5A059]/30 mb-6"></div>
        <p className="text-[10px] opacity-50 text-white/40 uppercase tracking-widest">© 2024 C'est la vie.</p>
      </div>

    </PageWrapper>
  );
}
