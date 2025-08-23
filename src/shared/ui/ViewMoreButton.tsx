"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";

import { Button } from "./button";

interface ViewMoreButtonProps {
  className?: string;
  isPending?: boolean;
  handleLoadMore: () => void;
}

export function ViewMoreButton({
  className,
  isPending,
  handleLoadMore,
}: ViewMoreButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={handleLoadMore}
      className={`group flex items-center gap-1 text-center text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground ${className || ""}`}
    >
      {isPending ? (
        <div className="flex items-center gap-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <>
          View more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </>
      )}
    </Button>
  );
}
