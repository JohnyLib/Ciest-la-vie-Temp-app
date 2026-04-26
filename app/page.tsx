"use client";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChefHat, Wine, Leaf } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } }
};

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <PageWrapper className="relative" ref={containerRef}>
      
      {/* Immersive Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-12 rounded-b-[40px] border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image 
            src="https://picsum.photos/seed/restaurant-interior/800/1000" 
            alt="C'est la vie Interior" 
            fill 
            className="object-cover opacity-60"
            referrerPolicy="no-referrer"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 w-16 h-16 rounded-full border border-[#C5A059]/30 flex items-center justify-center bg-black/20 backdrop-blur-md"
          >
            <ChefHat className="w-8 h-8 text-[#C5A059]" />
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            A Taste of Perfection
          </motion.h3>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl font-serif italic text-white mb-6 drop-shadow-2xl"
          >
            C'est la vie
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-white/60 text-xs tracking-widest uppercase leading-loose max-w-[300px]"
          >
            An elite culinary experience where passion meets precision in every dish.
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col px-6 pb-8">

        {/* Categories / Navigation Cards */}
        <motion.div 
          className="flex flex-col gap-6 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* Card 1: Food Menu */}
          <motion.div variants={ANIMATION_VARIANTS}>
            <Link href="/food" className="block relative h-[220px] rounded-[32px] overflow-hidden group shadow-xl">
              <Image 
                src="https://picsum.photos/seed/menu-food/800/600" 
                alt="Food Menu" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/80 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-serif italic text-white mb-1">Food Menu</h2>
                    <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Leaf className="w-3 h-3" /> Gastronomy
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1a1c20] border border-white/10 flex items-center justify-center group-hover:bg-[#C5A059] transition-colors">
                    <ArrowRight className="w-5 h-5 text-[#C5A059] group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 2: Drinks & Spirits */}
          <motion.div variants={ANIMATION_VARIANTS}>
            <Link href="/drinks" className="block relative h-[220px] rounded-[32px] overflow-hidden group shadow-xl">
              <Image 
                src="https://picsum.photos/seed/cocktail/800/600" 
                alt="Drinks and Spirits" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/80 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-serif italic text-white mb-1">Drinks & Spirits</h2>
                    <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Wine className="w-3 h-3" /> Mixology
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1a1c20] border border-white/10 flex items-center justify-center group-hover:bg-[#C5A059] transition-colors">
                    <ArrowRight className="w-5 h-5 text-[#C5A059] group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Our Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative p-8 rounded-[40px] bg-gradient-to-br from-[#1a1c20] to-[#0a0a0c] border border-white/5 overflow-hidden mb-16 shadow-2xl"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="inline-flex px-4 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] font-bold text-[9px] uppercase tracking-[0.2em] rounded-full mb-6">
              Our Philosophy
            </span>
            <h2 className="text-3xl font-serif italic mb-4 text-white">Art on a Plate</h2>
            <div className="w-10 h-px bg-[#C5A059] mb-6" />
            <p className="text-white/50 text-sm tracking-wide leading-loose mb-8 font-light">
              We believe that dining is more than sustenance—it is an event. Our chefs source only the finest seasonal ingredients to craft dishes that challenge the palate and delight the senses.
            </p>
            
            <div className="flex gap-4">
              <Image src="https://picsum.photos/seed/chef/200/200" alt="Chef" width={60} height={60} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" />
              <Image src="https://picsum.photos/seed/kitchen/200/200" alt="Kitchen" width={60} height={60} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" />
              <Image src="https://picsum.photos/seed/ingredients/200/200" alt="Ingredients" width={60} height={60} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </motion.div>

        {/* Design Accents / Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center pb-4"
        >
          <p className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.3em] mb-4">Concept Studio</p>
          <h4 className="text-2xl font-serif italic mb-2 text-white">Paris • Lyon</h4>
          <div className="w-24 h-px bg-[#C5A059]/30 mb-6"></div>
          <p className="text-[10px] opacity-50 text-white/40 uppercase tracking-widest">© 2024 C'est la vie.</p>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
