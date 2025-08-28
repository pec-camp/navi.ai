"use client";

import { AnimatedSideSheet } from "@/shared/ui/AnimatedSideSheet";
import { Review } from "@/src/entities/review";
import { useSideSheet } from "@/src/shared/hooks";

import ReviewForm from "./ReviewForm";

interface ReviewSideSheetProps {
  toolId: number;
  toolName: string;
  mode?: "create" | "edit";
  reviewId?: number;
  initialData?: Review;
}

export default function ReviewSideSheet({
  toolId,
  toolName,
  mode = "create",
  reviewId,
  initialData,
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
      <ReviewForm
        onClose={handleClose}
        mode={mode}
        reviewId={reviewId}
        initialData={initialData}
        toolId={toolId}
        toolName={toolName}
      />
    </AnimatedSideSheet>
  );
}
