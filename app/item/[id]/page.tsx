"use client";

import PageWrapper from "@/components/PageWrapper";
import { getItemById, drinksMenu } from "@/lib/data";
import { motion, AnimatePresence, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ChevronLeft, Minus, Plus, ShoppingBag, Wine, ArrowRight } from "lucide-react";
import { useState, use } from "react";

const STAGGER_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function ItemDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const item = getItemById(params.id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!item) {
    notFound();
  }

  // Adding some fake images for gallery
  const galleryImages = [
    item.image,
    item.image.replace("600", "601").replace("400", "401").replace("700", "701"),
    item.image.replace("600", "602").replace("400", "402").replace("700", "702")
  ];

  return (
    <PageWrapper className="relative bg-[#121212]">

      {/* Top action bar */}
      <div className="absolute top-6 left-0 w-full z-50 flex items-center justify-between px-6 pt-safe">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:scale-105 transition-all shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Image Section (Floating Block with Corners) */}
      <motion.div
        layoutId={`item-image-${item.id}`}
        className="w-full pt-4 px-4 relative z-10"
      >
        <div className="w-full h-[50vh] relative rounded-[32px] overflow-hidden shadow-2xl bg-[#1A1C20]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[activeImage]}
                alt={item.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        </div>
      </motion.div>

      {/* Details Section */}
      <motion.div
        variants={STAGGER_VARIANTS}
        initial="hidden"
        animate="show"
        className="relative z-20 flex-1 flex flex-col px-6 pt-8 pb-32"
      >
        <motion.div variants={ITEM_VARIANTS} className="flex justify-between items-start mb-2">
          <div>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E60000]"></span>
              {item.category} {item.tag ? `• ${item.tag}` : ''}
            </p>
            <motion.h1
              layoutId={`item-title-${item.id}`}
              className="text-4xl font-serif font-bold text-white leading-[1.1] tracking-tight"
            >
              {item.title}
            </motion.h1>
          </div>
        </motion.div>

        <motion.div variants={ITEM_VARIANTS} className="flex flex-col items-start gap-1 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#E60000]">{item.price}</span>
            {item.category === "Food" && <span className="text-xs text-white/50 font-bold tracking-widest uppercase">/ Portion</span>}
          </div>
        </motion.div>

        <motion.p variants={ITEM_VARIANTS} className="text-white/60 text-sm leading-relaxed mb-10 line-clamp-4">
          {item.description}
        </motion.p>

        {/* Gallery Thumbnails */}
        <motion.div variants={ITEM_VARIANTS} className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx
                  ? 'border-[#E60000] scale-105 shadow-[0_0_15px_rgba(230,0,0,0.3)]'
                  : 'border-transparent opacity-50 hover:opacity-100 bg-[#1A1C20]'
                }`}
            >
              <Image src={img} alt="" fill className="object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </motion.div>

        {/* Recommended Pairings */}
        {item.category === "Food" && (
          <motion.div variants={ITEM_VARIANTS} className="mb-8">
            <h3 className="text-lg font-serif font-bold text-white mb-4">
              Recommended Pairing
            </h3>
            <Link href={`/item/${drinksMenu.craftBeers[1].id}`} className="flex items-center gap-4 p-4 bg-[#1A1C20] rounded-3xl border border-transparent hover:border-white/10 transition-colors group">
              <div className="w-16 h-16 relative rounded-2xl overflow-hidden bg-white/5">
                <Image src={drinksMenu.craftBeers[1].image} alt="Pairing" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-serif font-bold text-white group-hover:text-[#E60000] transition-colors">{drinksMenu.craftBeers[1].title}</h4>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Perfect harmony</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.3 }}
        className="fixed bottom-0 left-0 w-full max-w-md mx-auto h-[100px] bg-[#121212] border-t border-white/10 px-6 flex items-center justify-between pb-safe z-50"
      >
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center bg-[#1A1C20] rounded-full border border-white/5 p-2 px-4 h-14">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors disabled:opacity-30"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-white text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 h-14 bg-[#E60000] text-white rounded-full flex items-center justify-center gap-3 font-bold tracking-widest text-xs uppercase shadow-[0_4px_20px_rgba(230,0,0,0.4)] transition-all hover:bg-[#ff1a1a]"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
