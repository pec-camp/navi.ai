"use client";

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";

interface AddToCompareButtonProps {
  size?: "big" | "small";
  onClick?: () => void;
  className?: string;
}

export default function AddToCompareButton({
  size = "small",
  onClick,
  className,
}: AddToCompareButtonProps) {
  if (size === "big") {
    return (
      <Button
        onClick={onClick}
        variant="outline"
        className={`border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 h-12 border-2 border-dashed px-6 transition-all duration-200 ${className}`}
      >
        <Plus className="mr-2 h-5 w-5 text-muted-foreground" />
        <span className="text-base font-medium text-muted-foreground">
          비교 목록에 추가
        </span>
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className={`border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 h-9 border px-3 transition-all duration-200 ${className}`}
    >
      <Plus className="mr-1.5 h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">비교</span>
    </Button>
  );
}
