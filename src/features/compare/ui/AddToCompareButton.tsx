"use client";

import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import type { formatToolDetail } from "@/entities/tool";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

import { useCompare } from "../model";

type FormattedTool = ReturnType<typeof formatToolDetail>;

interface AddToCompareButtonProps {
  tool: FormattedTool;
  size?: "big" | "small";
  className?: string;
}

export default function AddToCompareButton({
  tool,
  size = "small",
  className,
}: AddToCompareButtonProps) {
  const { addToCompare, isInCompare, items } = useCompare();
  const router = useRouter();
  const isAdded = isInCompare(tool.id);
  
  // Check if we can add more items
  const canAdd = items.length < 3 && !isAdded;
  const reason = items.length >= 3 ? "최대 3개까지만 비교할 수 있습니다" : 
                 isAdded ? "이미 비교 목록에 있습니다" : null;
  
  const handleClick = () => {
    if (isAdded) {
      // 현재 경로에 query parameter 추가하여 비교함 열기
      const currentPath = window.location.pathname;
      router.push(`${currentPath}?compare=open`);
    } else if (canAdd) {
      // Tool 객체를 표준 형식으로 변환
      addToCompare(tool);
      // 비교함 열기
      const currentPath = window.location.pathname;
      router.push(`${currentPath}?compare=open`);
    }
  };
  
  const tooltipText = isAdded ? "비교 목록 보기" : "비교 목록에 추가";
  
  const button = size === "big" ? (
    <Button
      onClick={handleClick}
      variant={isAdded ? "default" : "outline"}
      size="lg"
      disabled={!canAdd && !isAdded}
      className={`h-12 transition-all duration-200 ${
        isAdded 
          ? "bg-primary hover:bg-primary/90" 
          : "hover:bg-muted"
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          비교 목록 보기
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          비교 목록에 추가
        </>
      )}
    </Button>
  ) : (
    <Button
      onClick={handleClick}
      variant={isAdded ? "default" : "ghost"}
      size="icon"
      disabled={!canAdd && !isAdded}
      className={`h-8 w-8 rounded-full transition-all duration-200 ${
        isAdded 
          ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
          : "hover:bg-muted"
      } ${className}`}
    >
      {isAdded ? (
        <Check className="h-4 w-4" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
    </Button>
  );
  
  // Always wrap in tooltip for small size
  if (size === "small") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>{reason || tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // For big size, only show tooltip if there's a reason (disabled state)
  if (!canAdd && !isAdded && reason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>{reason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return button;
}
