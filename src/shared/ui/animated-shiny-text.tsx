"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/shared/ui/lib/utils";

interface AnimatedShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
}

const AnimatedShinyText = React.forwardRef<
  HTMLDivElement,
  AnimatedShinyTextProps
>(({ text, className, shimmerWidth = 100 }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <span className="whitespace-pre-wrap">{text}</span>
        <motion.div
          className="absolute inset-0 -top-0 flex h-full w-full justify-center blur-[12px]"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 50%, transparent)`,
          }}
          initial={{ x: -shimmerWidth * 2 }}
          animate={{ x: shimmerWidth * 2 }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 -top-0 flex h-full w-full justify-center"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)`,
          }}
          initial={{ x: -shimmerWidth * 2 }}
          animate={{ x: shimmerWidth * 2 }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
});

AnimatedShinyText.displayName = "AnimatedShinyText";

export { AnimatedShinyText };
