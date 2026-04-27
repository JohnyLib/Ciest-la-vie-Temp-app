"use client";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChefHat, Wine, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, memo } from "react";
import { getFeaturedItems, categories } from "@/lib/data";

const featured = getFeaturedItems(6);

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 18 } }
};

// Memoized featured card for performance
const FeaturedCard = memo(function FeaturedCard({ item, idx }: { item: typeof featured[0]; idx: number }) {
  return (
    <Link href={`/item/${item.id}`} className="flex-shrink-0 w-[160px] group">
      <div className="relative w-[160px] h-[200px] rounded-[20px] overflow-hidden mb-3 bg-[#1A1C20]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          sizes="160px"
          loading={idx < 3 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-xs font-serif font-bold leading-tight line-clamp-2">{item.title}</p>
          <p className="text-[#E60000] text-[11px] font-bold mt-1">{item.priceLei}</p>
        </div>
      </div>
    </Link>
  );
});

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <PageWrapper className="relative" ref={containerRef}>

      {/* ═══════ HERO ═══════ */}
      <div className="relative h-[75vh] w-full overflow-hidden mb-10">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 will-change-transform">
          <Image
            src="https://picsum.photos/seed/restaurant-interior/800/1200"
            alt="C'est la vie Interior"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
            sizes="(max-width: 448px) 100vw, 448px"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 w-14 h-14 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-black/30 backdrop-blur-md shadow-[0_0_30px_rgba(197,160,89,0.15)]"
          >
            <ChefHat className="w-7 h-7 text-[#C5A059]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[#C5A059] text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
          >
            A Taste of Perfection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[3.5rem] font-serif italic text-white mb-4 drop-shadow-2xl leading-[1]"
          >
            C&apos;est la vie
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-white/50 text-xs tracking-widest uppercase leading-[2] max-w-[280px] mb-8"
          >
            Where passion meets precision in every dish
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Link
              href="/food"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E60000] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_4px_30px_rgba(230,0,0,0.4)] hover:shadow-[0_4px_40px_rgba(230,0,0,0.6)] hover:bg-[#ff1a1a] transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore Menu
            </Link>
          </motion.div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute -bottom-1 left-0 w-full h-16 bg-[#0a0a0c] rounded-t-[40px]" />
      </div>

      <div className="relative z-10 flex flex-col px-6 pb-8">

        {/* ═══════ FEATURED DISHES ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[#E60000] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">Popular</p>
              <h2 className="text-2xl font-serif font-bold text-white">Featured Dishes</h2>
            </div>
            <Link href="/food" className="text-white/40 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 snap-x snap-mandatory">
            {featured.map((item, idx) => (
              <FeaturedCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </motion.div>

        {/* ═══════ CATEGORY CARDS ═══════ */}
        <motion.div
          className="flex flex-col gap-5 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {/* Food Menu Card */}
          <motion.div variants={CARD_VARIANTS}>
            <Link href="/food" className="block relative h-[200px] rounded-[28px] overflow-hidden group shadow-xl">
              <Image
                src="https://picsum.photos/seed/menu-food/800/600"
                alt="Food Menu"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                referrerPolicy="no-referrer"
                sizes="(max-width: 448px) 100vw, 448px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7 w-full">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-3 h-3 text-[#C5A059]" />
                      <p className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.2em]">
                        {categories.length} Categories • {categories.reduce((s, c) => s + c.count, 0)} Dishes
                      </p>
                    </div>
                    <h2 className="text-2xl font-serif italic text-white">Food Menu</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E60000] transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Drinks Card */}
          <motion.div variants={CARD_VARIANTS}>
            <Link href="/drinks" className="block relative h-[200px] rounded-[28px] overflow-hidden group shadow-xl">
              <Image
                src="https://picsum.photos/seed/cocktail/800/600"
                alt="Drinks and Spirits"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                referrerPolicy="no-referrer"
                sizes="(max-width: 448px) 100vw, 448px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7 w-full">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Wine className="w-3 h-3 text-[#C5A059]" />
                      <p className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.2em]">Craft & Classic</p>
                    </div>
                    <h2 className="text-2xl font-serif italic text-white">Drinks & Spirits</h2>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E60000] transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* ═══════ PHILOSOPHY ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative p-8 rounded-[32px] bg-gradient-to-br from-[#141618] to-[#0a0a0c] border border-white/[0.05] overflow-hidden mb-14"
        >
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#C5A059]/8 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#E60000]/5 rounded-full blur-[40px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="inline-flex px-4 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-bold text-[9px] uppercase tracking-[0.2em] rounded-full mb-5">
              Our Philosophy
            </span>
            <h2 className="text-2xl font-serif italic mb-3 text-white">Art on a Plate</h2>
            <div className="w-8 h-px bg-[#C5A059]/50 mb-5" />
            <p className="text-white/45 text-sm tracking-wide leading-[1.8] mb-7 font-light max-w-[300px]">
              We believe that dining is more than sustenance—it is an event. Our chefs source only the finest seasonal ingredients to craft dishes that challenge and delight.
            </p>

            <div className="flex gap-3">
              <Image src="https://picsum.photos/seed/chef/200/200" alt="Chef" width={52} height={52} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" loading="lazy" />
              <Image src="https://picsum.photos/seed/kitchen/200/200" alt="Kitchen" width={52} height={52} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" loading="lazy" />
              <Image src="https://picsum.photos/seed/ingredients/200/200" alt="Ingredients" width={52} height={52} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" loading="lazy" />
            </div>
          </div>
        </motion.div>

        {/* ═══════ FOOTER ═══════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center pb-4"
        >
          <div className="w-6 h-6 rounded-full bg-[#E60000] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(230,0,0,0.2)]">
            <span className="text-white text-[8px] font-bold font-serif">C</span>
          </div>
          <h4 className="text-lg font-serif italic mb-1 text-white">C&apos;est la vie</h4>
          <p className="text-white/30 text-[10px] tracking-widest uppercase mb-6">Paris • Lyon • Chișinău</p>
          <div className="w-20 h-px bg-white/[0.06] mb-6" />
          <p className="text-[9px] text-white/20 uppercase tracking-widest">© 2024 All rights reserved.</p>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
