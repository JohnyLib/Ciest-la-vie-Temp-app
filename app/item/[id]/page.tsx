"use client";

import PageWrapper from "@/components/PageWrapper";
import { getItemById, drinksMenu } from "@/lib/data";
import { motion, AnimatePresence, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ChevronLeft, ArrowRight, Scale } from "lucide-react";
import { useState, use } from "react";

const STAGGER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
};
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 20 } }
};

export default function ItemDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const item = getItemById(params.id);
  const [activeImage, setActiveImage] = useState(0);

  if (!item) notFound();

  const galleryImages = [
    item.image,
    item.image.replace(/seed\/(\d+)/, 'seed/$1a'),
    item.image.replace(/seed\/(\d+)/, 'seed/$1b'),
  ];

  const isDrinks = item.category === "Drinks" || item.category === "Напитки";

  return (
    <PageWrapper className="relative bg-[#0a0a0c]">
      {/* Back button */}
      <div className="absolute top-5 left-0 w-full z-50 flex items-center px-5">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl text-white hover:bg-black/60 transition-all active:scale-95 shadow-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Image */}
      <motion.div layoutId={`item-image-${item.id}`} className="w-full pt-3 px-3 relative z-10">
        <div className="w-full h-[48vh] relative rounded-[28px] overflow-hidden bg-[#141618]">
          <AnimatePresence mode="wait">
            <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
              <Image src={galleryImages[activeImage]} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" priority sizes="(max-width: 448px) 100vw, 448px" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Gallery dots */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
            {galleryImages.map((_, idx) => (
              <button key={idx} onClick={() => setActiveImage(idx)} className={`w-2 h-2 rounded-full transition-all ${activeImage === idx ? 'bg-white w-5' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Details */}
      <motion.div variants={STAGGER} initial="hidden" animate="show" className="relative z-20 flex-1 flex flex-col px-6 pt-7 pb-12">
        <motion.div variants={FADE_UP} className="mb-1">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E60000]" />
            {item.category} {item.tag ? `· ${item.tag}` : ''}
          </p>
          <motion.h1 layoutId={`item-title-${item.id}`} className="text-3xl font-serif font-bold text-white leading-[1.1] tracking-tight">
            {item.title}
          </motion.h1>
        </motion.div>

        {/* Price + Weight row */}
        <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-5 mt-3">
          <span className="text-2xl font-serif font-bold text-[#E60000]">{item.price}</span>
          {item.priceEur && <span className="text-xs text-white/30 font-medium">{item.priceEur}</span>}
          {item.weight > 0 && (
            <div className="flex items-center gap-1 ml-auto px-3 py-1 rounded-full bg-white/[0.05] text-[11px] text-white/50">
              <Scale className="w-3.5 h-3.5" />{item.weight}g
            </div>
          )}
        </motion.div>

        <motion.p variants={FADE_UP} className="text-white/45 text-sm leading-[1.7] mb-8">
          {item.description}
        </motion.p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <motion.div variants={FADE_UP} className="flex gap-2 flex-wrap mb-8">
            {item.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 text-[10px] font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Gallery Thumbnails */}
        <motion.div variants={FADE_UP} className="flex gap-3 mb-8">
          {galleryImages.map((img, idx) => (
            <button key={idx} onClick={() => setActiveImage(idx)} className={`relative w-[72px] h-[72px] rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-[#E60000] shadow-[0_0_12px_rgba(230,0,0,0.25)]' : 'border-transparent opacity-40 hover:opacity-70'}`}>
              <Image src={img} alt="" fill className="object-cover" referrerPolicy="no-referrer" sizes="72px" loading="lazy" />
            </button>
          ))}
        </motion.div>

        {/* Recommended Pairing */}
        {!isDrinks && (
          <motion.div variants={FADE_UP} className="mb-6">
            <h3 className="text-sm font-serif font-bold text-white mb-3">Recommended Pairing</h3>
            <Link href={`/item/${drinksMenu.craftBeers[1].id}`} className="flex items-center gap-4 p-4 bg-[#141618] rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-colors group">
              <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                <Image src={drinksMenu.craftBeers[1].image} alt="Pairing" fill className="object-cover" referrerPolicy="no-referrer" sizes="56px" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#E60000] transition-colors truncate">{drinksMenu.craftBeers[1].title}</h4>
                <p className="text-[9px] text-white/35 uppercase tracking-widest mt-0.5">Perfect harmony</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-white/50" />
              </div>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </PageWrapper>
  );
}
