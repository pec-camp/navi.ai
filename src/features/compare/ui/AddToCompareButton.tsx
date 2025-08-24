"use client";

import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Tool } from "@/entities/tool";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

import { useCanAddToCompare,useCompare } from "../model";

interface AddToCompareButtonProps {
  tool: Tool;
  size?: "big" | "small";
  className?: string;
}

export default function AddToCompareButton({
  tool,
  size = "small",
  className,
}: AddToCompareButtonProps) {
  const { addToCompare, isInCompare } = useCompare();
  const { canAdd, reason } = useCanAddToCompare(tool);
  const router = useRouter();
  const isAdded = isInCompare(tool.id);
  
  const handleClick = () => {
    if (isAdded) {
      // 현재 경로에 query parameter 추가
      const currentPath = window.location.pathname;
      router.push(`${currentPath}?compare=open`);
    } else if (canAdd) {
      addToCompare(tool);
      // 현재 경로에 query parameter 추가
      const currentPath = window.location.pathname;
      router.push(`${currentPath}?compare=open`);
    }
  };
  
  const button = size === "big" ? (
    <Button
      onClick={handleClick}
      variant={isAdded ? "default" : "outline"}
      disabled={!canAdd && !isAdded}
      className={`h-12 px-6 transition-all duration-200 ${
        isAdded 
          ? "bg-primary hover:bg-primary/90" 
          : "border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          <span className="text-base font-medium">비교 목록 보기</span>
        </>
      ) : (
        <>
          <Plus className="mr-2 h-5 w-5 text-muted-foreground" />
          <span className="text-base font-medium text-muted-foreground">
            비교 목록에 추가
          </span>
        </>
      )}
    </Button>
  ) : (
    <Button
      onClick={handleClick}
      variant={isAdded ? "default" : "outline"}
      size="sm"
      disabled={!canAdd && !isAdded}
      className={`h-9 px-3 transition-all duration-200 ${
        isAdded 
          ? "bg-primary hover:bg-primary/90" 
          : "border border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="mr-1.5 h-4 w-4" />
          <span className="text-sm font-medium">추가됨</span>
        </>
      ) : (
        <>
          <Plus className="mr-1.5 h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">비교</span>
        </>
      )}
    </Button>
  );
  
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
