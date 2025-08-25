"use client";

import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedSideSheet } from "@/shared/ui/AnimatedSideSheet";

import CompareContent from "./CompareContent";

export default function CompareSideSheet() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Check if compare query param is present
  useEffect(() => {
    setIsOpen(searchParams.get('compare') === 'open');
  }, [searchParams]);
  
  const handleClose = () => {
    // Don't change route if we're navigating to compare-result
    if (!isNavigating) {
      // Remove query parameter when closing normally
      const currentPath = window.location.pathname;
      router.push(currentPath);
    }
  };
  
  const handleNavigateAndClose = () => {
    // Set flag to prevent route conflict
    setIsNavigating(true);
    setIsOpen(false);
  };
  
  const handleExitComplete = () => {
    // Reset navigation flag after animation completes
    setIsNavigating(false);
  };

  return (
    <AnimatedSideSheet
      isOpen={isOpen}
      onExitComplete={handleExitComplete}
      onClose={handleClose}
      side="right"
      size="md"
    >
      <CompareContent onClose={handleNavigateAndClose} />
    </AnimatedSideSheet>
  );
}