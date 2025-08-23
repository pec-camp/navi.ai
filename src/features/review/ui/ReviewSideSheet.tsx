"use client";

import { AnimatedSideSheet } from "@/shared/ui/AnimatedSideSheet";
import { useSideSheet } from "@/src/shared/hooks";

import ReviewForm from "./ReviewForm";

interface ReviewSideSheetProps {
  toolName?: string;
  toolId: number;
}

export default function ReviewSideSheet({
  toolName = "도구",
  toolId,
}: ReviewSideSheetProps) {
  const { isOpen, handleClose, handleExitComplete } = useSideSheet();

  return (
    <AnimatedSideSheet
      isOpen={isOpen}
      onExitComplete={handleExitComplete}
      onClose={handleClose}
      side="right"
      size="md"
    >
      <ReviewForm toolName={toolName} toolId={toolId} onClose={handleClose} />
    </AnimatedSideSheet>
  );
}
