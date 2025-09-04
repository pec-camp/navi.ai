"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface SideSheetOptions {
  initialOpen?: boolean;
  onExitComplete?: () => void;
  modalParamName?: string; // modal 파라미터 이름 커스터마이징
}

export const useSideSheet = (options: SideSheetOptions = {}) => {
  const {
    initialOpen = true,
    onExitComplete,
    modalParamName = "modal",
  } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExitComplete = useCallback(() => {
    try {
      if (onExitComplete) {
        onExitComplete();
      } else {
        // 현재 경로의 SearchParams에서 모달 파라미터 제거
        const params = new URLSearchParams(searchParams.toString());
        params.delete(modalParamName);
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.push(newUrl);
      }
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  }, [router, searchParams, pathname, onExitComplete, modalParamName]);

  return {
    isOpen,
    setIsOpen,
    handleClose,
    handleExitComplete,
  };
};
