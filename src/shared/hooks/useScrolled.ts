"use client";

import { useEffect, useState } from "react";

/**
 * 스크롤 위치가 threshold 이상이면 true를 반환
 * @param threshold - 기본 80px
 */
export const useScrolled = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};