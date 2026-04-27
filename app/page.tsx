"use client";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ChefHat, MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

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
      <div className="relative h-[85vh] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 w-16 h-16 rounded-full border border-[#C5A059]/30 flex items-center justify-center bg-black/30 backdrop-blur-md shadow-[0_0_40px_rgba(197,160,89,0.15)]"
          >
            <ChefHat className="w-8 h-8 text-[#C5A059]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[#C5A059] text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[3.5rem] font-serif italic text-white mb-3 drop-shadow-2xl leading-[1]"
          >
            C&apos;est la vie
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-white/40 text-xs tracking-widest uppercase leading-[2] max-w-[260px] mb-10"
          >
            Where passion meets precision in every dish
          </motion.p>

          {/* Show Menu CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/food"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#E60000] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_4px_30px_rgba(230,0,0,0.4)] hover:shadow-[0_4px_40px_rgba(230,0,0,0.6)] hover:bg-[#ff1a1a] transition-all active:scale-95"
            >
              Show Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom curve */}
        <div className="absolute -bottom-1 left-0 w-full h-12 bg-[#0a0a0c] rounded-t-[40px]" />
      </div>

      <div className="relative z-10 flex flex-col px-6 pb-8">

        {/* ═══════ ABOUT US ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative p-8 rounded-[32px] bg-gradient-to-br from-[#141618] to-[#0c0c0e] border border-white/[0.05] overflow-hidden mb-10"
        >
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#C5A059]/8 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#E60000]/5 rounded-full blur-[40px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex px-4 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-bold text-[9px] uppercase tracking-[0.2em] rounded-full mb-5">
              About Us
            </span>

            <h2 className="text-2xl font-serif italic mb-4 text-white leading-tight">
              A Story of<br />Passion & Flavor
            </h2>
            <div className="w-8 h-px bg-[#C5A059]/40 mb-5" />

            <p className="text-white/40 text-sm leading-[1.8] mb-6 font-light">
              Born from a love of authentic cuisine and an unwavering commitment to excellence, C&apos;est la vie is more than a restaurant — it&apos;s an experience. Our chefs source the finest seasonal ingredients to craft dishes that tell a story.
            </p>

            {/* Chef images */}
            <div className="flex items-center gap-3 mb-6">
              <Image src="https://picsum.photos/seed/chef/200/200" alt="Chef" width={48} height={48} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" loading="lazy" />
              <Image src="https://picsum.photos/seed/kitchen/200/200" alt="Kitchen" width={48} height={48} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" loading="lazy" />
              <Image src="https://picsum.photos/seed/ingredients/200/200" alt="Ingredients" width={48} height={48} className="rounded-full border-2 border-white/10 object-cover" referrerPolicy="no-referrer" loading="lazy" />
              <div className="ml-2">
                <p className="text-white text-[11px] font-bold">Our Team</p>
                <p className="text-white/30 text-[10px]">10+ years of excellence</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════ INFO CARDS ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {/* Hours */}
          <div className="p-5 rounded-[20px] bg-[#141618] border border-white/[0.04]">
            <Clock className="w-5 h-5 text-[#C5A059] mb-3" />
            <h3 className="text-sm font-serif font-bold text-white mb-1">Hours</h3>
            <p className="text-white/30 text-[10px] leading-relaxed">
              Mon–Fri: 11:00–23:00<br />
              Sat–Sun: 10:00–00:00
            </p>
          </div>

          {/* Location */}
          <div className="p-5 rounded-[20px] bg-[#141618] border border-white/[0.04]">
            <MapPin className="w-5 h-5 text-[#C5A059] mb-3" />
            <h3 className="text-sm font-serif font-bold text-white mb-1">Location</h3>
            <p className="text-white/30 text-[10px] leading-relaxed">
              Str. Bulevardul Ștefan<br />
              cel Mare, Chișinău
            </p>
          </div>

          {/* Contact — spans full width */}
          <div className="col-span-2 p-5 rounded-[20px] bg-[#141618] border border-white/[0.04] flex items-center gap-4">
            <Phone className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <div>
              <h3 className="text-sm font-serif font-bold text-white mb-0.5">Reservations</h3>
              <p className="text-white/30 text-[10px]">+373 22 123 456 · info@cestlavie.md</p>
            </div>
          </div>
        </motion.div>

        {/* ═══════ MENU CTA BANNER ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/food" className="block relative h-[180px] rounded-[28px] overflow-hidden group mb-10">
            <Image
              src="https://picsum.photos/seed/menu-food/800/600"
              alt="View Menu"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
              referrerPolicy="no-referrer"
              sizes="(max-width: 448px) 100vw, 448px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 w-full flex items-end justify-between">
              <div>
                <p className="text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Discover</p>
                <h2 className="text-2xl font-serif italic text-white">Our Full Menu</h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E60000] transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
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
          <p className="text-white/25 text-[10px] tracking-widest uppercase mb-6">Paris · Lyon · Chișinău</p>
          <div className="w-20 h-px bg-white/[0.06] mb-6" />
          <p className="text-[9px] text-white/15 uppercase tracking-widest">© 2024 All rights reserved.</p>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
