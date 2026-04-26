"use client";

import PageWrapper from "@/components/PageWrapper";
import { foodMenu } from "@/lib/data";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "pizzas", label: "Stone-Baked Pizza" }
];

export default function FoodMenuPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <PageWrapper className="px-6 pt-24 pb-20 bg-[#121212]">
      
      {/* Header */}
      <motion.div 
        className="flex flex-col items-center text-center mb-8"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight">
          Culinary<br/>Canvas
        </h1>
        
        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center w-full max-w-full">
          {FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`whitespace-nowrap px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeFilter === filter.id 
                  ? "bg-[#E60000] text-white" 
                  : "bg-transparent border border-white/20 text-white/80 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex flex-col gap-12 pb-10">
        
        <AnimatePresence mode="popLayout">
          
          {/* Starters Section */}
          {(activeFilter === "all" || activeFilter === "starters") && (
            <motion.section 
              key="starters"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-serif font-bold text-white">
                  Starters
                </h2>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>
              
              <div className="flex flex-col gap-6">
                {foodMenu.starters.map((item: any) => (
                  <Link href={`/item/${item.id}`} key={item.id} className="block bg-[#1A1C20] rounded-[24px] overflow-hidden group border border-transparent hover:border-white/10 transition-colors">
                    <div className="w-full h-[220px] relative">
                      <Image src={item.image} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-xs text-white/50 leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-serif font-bold text-[#E60000]">{item.priceLei}</span>
                          {item.priceEur && <span className="text-[10px] text-white/50 font-bold tracking-wider">/ {item.priceEur}</span>}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Pizzas Section */}
          {(activeFilter === "all" || activeFilter === "pizzas") && (
            <motion.section 
              key="pizzas"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-serif font-bold text-white">
                  Stone-Baked<br/>Pizza
                </h2>
              </div>
              
              <div className="flex flex-col gap-6">
                {foodMenu.pizzas.map((item: any) => (
                  <Link href={`/item/${item.id}`} key={item.id} className="block group">
                    <div className="bg-transparent rounded-[24px] overflow-hidden">
                      <div className="w-full h-[240px] relative rounded-[24px] overflow-hidden mb-4">
                        <Image src={item.image} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="px-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif font-bold text-white leading-tight pr-4">{item.title}</h3>
                          <span className="text-xl font-serif font-bold text-[#E60000] whitespace-nowrap">{item.priceLei}</span>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed mb-5 line-clamp-3">
                          {item.description}
                        </p>
                        <button className="w-full py-3 px-6 rounded-full border border-white text-white font-bold text-xs hover:bg-white hover:text-black transition-colors pointer-events-none">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <div className="mt-8 flex flex-col items-center text-center pb-8 border-t border-white/5 pt-12">
        <h4 className="text-lg font-serif font-bold mb-6 text-white">C'est la vie</h4>
        <div className="flex gap-4 text-[10px] text-white/50 mb-8 font-medium">
          <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
          <Link href="#" className="hover:text-white transition-colors">Location</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
        </div>
        <p className="text-[9px] text-white/30 font-medium">© 2024 C'est la vie. Elite Culinary Experience.</p>
      </div>

    </PageWrapper>
  );
}
