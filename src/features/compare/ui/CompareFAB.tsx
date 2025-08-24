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
    router.push(`${currentPath}?compare=open`);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}>
      <Button
        onClick={handleClick}
        className="h-14 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            <div className="w-2 h-2 bg-white rounded-sm" />
            <div className="w-2 h-2 bg-white rounded-sm" />
            <div className="w-2 h-2 bg-white rounded-sm" />
            <div className="w-2 h-2 bg-white rounded-sm" />
          </div>
          <span>비교하기 ({count})</span>
        </div>
      </Button>
    </div>
  );
}
