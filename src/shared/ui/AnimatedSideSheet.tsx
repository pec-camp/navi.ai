"use client";

import { cn } from "@/shared/ui/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface AnimatedSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  onExitComplete?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "max-w-[400px]",
  md: "max-w-[600px]",
  lg: "max-w-[840px]",
  xl: "max-w-[1200px]",
};

const slideVariants = {
  right: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  left: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
};

/**
 *
 * shadcn 컴포넌트에서
 */
export function AnimatedSideSheet({
  isOpen,
  onClose,
  children,
  side = "right",
  size = "lg",
  onExitComplete,
  className,
}: AnimatedSideSheetProps) {
  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const variants = slideVariants[side];
  const positionClasses =
    side === "right" ? "right-4 top-4 bottom-4" : "left-4 top-4 bottom-4";

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={onClose}
            aria-label="Close sheet"
          />

          {/* Sheet Content */}
          <motion.div
            initial={variants.initial}
            animate={{
              ...variants.animate,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 120,
                duration: 0.4,
              },
            }}
            exit={{
              ...variants.exit,
              transition: {
                type: "tween",
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            className={cn(
              "fixed z-50 w-full rounded-md bg-background shadow-lg",
              positionClasses,
              sizeClasses[size],
              className,
            )}
            style={{
              willChange: "transform, opacity",
            }}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
