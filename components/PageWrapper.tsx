"use client";

import { motion } from "motion/react";
import { ReactNode, forwardRef } from "react";

const PageWrapper = forwardRef<HTMLDivElement, { children: ReactNode, className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 flex flex-col w-full h-full ${className}`}
      >
        {children}
      </motion.div>
    );
  }
);

PageWrapper.displayName = "PageWrapper";
export default PageWrapper;
