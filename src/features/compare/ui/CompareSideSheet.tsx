"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedSideSheet } from "@/shared/ui/AnimatedSideSheet";

import CompareContent from "./CompareContent";

/**
 * 비교 도구 사이드 시트 컴포넌트
 * 
 * @description 도구 비교 기능을 위한 사이드 시트 모달
 * @note Dynamic import로 클라이언트에서만 렌더링되어 SSR 문제 해결
 * @reason Layout에서 직접 사용 시 useSearchParams()로 인한 전체 페이지 동적 렌더링 발생
 * @result CompareClientWrapper를 통한 조건부 로딩으로 성능 최적화
 */
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