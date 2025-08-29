"use client";

import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/shared/ui/button";
import { Review } from "@/src/entities/review/model/Review.interface";
import { cn } from "@/src/shared/ui/lib/utils";

import { useReviewActionState } from "../model/useReviewActionState";

interface ReviewFormProps {
  toolName: string;
  toolId: number;
  onClose: () => void;
  mode?: "create" | "edit";
  reviewId?: number;
  initialData?: Review | null;
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      disabled={pending}
      className="h-12 w-full text-base font-medium"
    >
      {pending
        ? mode === "edit"
          ? "수정 중..."
          : "제출 중..."
        : mode === "edit"
          ? "리뷰 수정"
          : "리뷰 제출"}
    </Button>
  );
}

export default function ReviewForm({
  toolName,
  toolId,
  onClose,
  mode = "create",
  reviewId,
  initialData,
}: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [reviewText, setReviewText] = useState(initialData?.reviewText || "");
  const { reviewFormState, reviewFormAction } = useReviewActionState(
    toolId,
    onClose,
    mode,
    reviewId,
  );

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  // 성공시 자동 닫기는 useReviewActionState에서 onClose 콜백으로 처리됨

  useEffect(() => {
    if (reviewFormState?.success) {
      // toast ui 추가
    }
  }, [reviewFormState]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-6">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl font-black capitalize text-primary">
              {toolName}
            </span>
            <span className="text-2xl font-bold text-foreground">
              {mode === "edit" ? "리뷰 수정하기" : "리뷰 남기기"}
            </span>
          </div>
          <p className="text-base font-light text-muted-foreground">
            {mode === "edit"
              ? `${toolName} 리뷰를 수정하세요.`
              : `${toolName}에 대한 솔직한 경험을 공유해주세요.`}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form action={reviewFormAction} className="flex flex-1 flex-col">
        {/* Hidden fields for edit mode */}
        {mode === "edit" && reviewId && (
          <>
            <input type="hidden" name="mode" value="edit" />
            <input type="hidden" name="reviewId" value={reviewId} />
          </>
        )}

        {/* Form Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* 에러 메시지 */}
          {reviewFormState && !reviewFormState.success && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {reviewFormState.message}
            </div>
          )}

          {/* 별점 */}
          <div className="space-y-3">
            <input type="hidden" name="rating" value={rating} />
            <label className="text-base font-medium text-foreground">
              평점 *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="transition-colors hover:scale-110"
                >
                  <Star
                    strokeWidth={1}
                    className={cn(
                      "h-7 w-7",
                      star <= rating
                        ? "fill-star text-star"
                        : "fill-none text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            {reviewFormState?.errors?.rating && (
              <p className="text-sm text-red-600">
                {reviewFormState.errors.rating[0]}
              </p>
            )}
          </div>

          {/* 사용 경험 */}
          <div className="space-y-3">
            <label className="text-base font-medium text-foreground">
              사용 경험 *
            </label>
            <textarea
              name="review_text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="상세한 사용 경험은 다른 사용자에게 큰 도움이 됩니다."
              className="h-40 w-full resize-none rounded-md border border-border p-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {reviewFormState?.errors?.review_text && (
              <p className="text-sm text-red-600">
                {reviewFormState.errors.review_text[0]}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <SubmitButton mode={mode} />
        </div>
      </form>
    </div>
  );
}
