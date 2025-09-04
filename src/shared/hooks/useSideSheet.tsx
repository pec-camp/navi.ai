"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface SideSheetOptions {
  initialOpen?: boolean;
  onExitComplete?: () => void;
}

export const useSideSheet = (options: SideSheetOptions = {}) => {
  const { initialOpen = true, onExitComplete } = options;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [lastDefaultOpen, setLastDefaultOpen] = useState(initialOpen);

  if (initialOpen !== lastDefaultOpen) {
    setIsOpen(initialOpen);
    setLastDefaultOpen(initialOpen);
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExitComplete = useCallback(() => {
    try {
      if (onExitComplete) {
        onExitComplete();
      } else {
        router.back();
      }
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  }, [onExitComplete, router]);

  return {
    isOpen,
    setIsOpen,
    handleClose,
    handleExitComplete,
  };
};
