"use client";

import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedSideSheet } from "@/shared/ui/AnimatedSideSheet";

import CompareContent from "./CompareContent";

export default function CompareSideSheet() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if compare query param is present
  useEffect(() => {
    setIsOpen(searchParams.get('compare') === 'open');
  }, [searchParams]);
  
  const handleClose = () => {
    // Remove query parameter when closing
    const currentPath = window.location.pathname;
    router.push(currentPath);
  };
  
  const handleExitComplete = () => {
    // Clean up after animation completes
  };

  return (
    <AnimatedSideSheet
      isOpen={isOpen}
      onExitComplete={handleExitComplete}
      onClose={handleClose}
      side="right"
      size="md"
    >
      <CompareContent onClose={handleClose} />
    </AnimatedSideSheet>
  );
}