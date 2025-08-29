"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/shared/ui/lib/utils";

interface AuroraTextProps {
  text: string;
  className?: string;
  animation?: "aurora" | "glow";
  duration?: number;
}

const AuroraText = React.forwardRef<HTMLSpanElement, AuroraTextProps>(
  ({ text, className, animation = "aurora", duration = 3 }, ref) => {
    return (
      <motion.span 
        ref={ref} 
        className={cn("relative inline-block", className)}
        style={{
          background: `linear-gradient(135deg, #7C3AED 0%, #A855F7 30%, #D946EF 70%, #EC4899 100%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        animate={{
          backgroundImage: [
            `linear-gradient(135deg, #7C3AED 0%, #A855F7 30%, #D946EF 70%, #EC4899 100%)`,
            `linear-gradient(135deg, #EC4899 0%, #D946EF 30%, #A855F7 70%, #7C3AED 100%)`,
            `linear-gradient(135deg, #A855F7 0%, #EC4899 30%, #7C3AED 70%, #D946EF 100%)`,
            `linear-gradient(135deg, #7C3AED 0%, #A855F7 30%, #D946EF 70%, #EC4899 100%)`,
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    );
  },
);

AuroraText.displayName = "AuroraText";

export { AuroraText };
