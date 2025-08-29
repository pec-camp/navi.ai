"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/button";

import { useCompareCount } from "../model";

export default function CompareFAB() {
  const count = useCompareCount();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide FAB based on count with animation
  useEffect(() => {
    setIsVisible(count > 0);
  }, [count]);

  const handleClick = () => {
    // 현재 경로에 query parameter 추가
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?compare=open`, { scroll: false });
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <Button
        onClick={handleClick}
        className="h-14 rounded-full bg-gray-900 px-6 font-medium text-white shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-5 w-5 grid-cols-2 gap-0.5">
            <div className="h-2 w-2 rounded-sm bg-white" />
            <div className="h-2 w-2 rounded-sm bg-white" />
            <div className="h-2 w-2 rounded-sm bg-white" />
            <div className="h-2 w-2 rounded-sm bg-white" />
          </div>
          <span>비교하기 ({count})</span>
        </div>
      </Button>
    </div>
  );
}
