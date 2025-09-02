"use client";

import { useActionState } from "react";

import { ReviewFormState } from "@/features/auth/model/auth.interface";

import { addReview, updateReview } from "../action";

export const useReviewActionState = (
  toolId: number,
  onSuccess?: () => void,
  mode: "create" | "edit" = "create",
  reviewId?: number,
) => {
  const reviewAction = async (
    prevState: ReviewFormState,
    formData: FormData,
  ) => {
    const rating = Number(formData.get("rating"));
    const review_text = formData.get("review_text") as string;
    const formMode = formData.get("mode") as string;
    const formReviewId = formData.get("reviewId") as string;

    // 폼 검증
    if (!rating || rating < 1 || rating > 5) {
      return {
        success: false,
        message: "별점을 선택해주세요.",
        errors: { rating: ["별점은 1-5 사이의 값이어야 합니다."] },
      };
    }

    if (!review_text?.trim()) {
      return {
        success: false,
        message: "사용 경험을 입력해주세요.",
        errors: { review_text: ["사용 경험을 입력해주세요."] },
      };
    }

    // Edit mode인 경우 updateReview 호출
    if (mode === "edit" || formMode === "edit") {
      const targetReviewId = reviewId || parseInt(formReviewId, 10);

      if (!targetReviewId || isNaN(targetReviewId)) {
        return {
          success: false,
          message: "잘못된 리뷰 ID입니다.",
        };
      }

      const result = await updateReview(
        targetReviewId,
        rating,
        review_text.trim(),
      );

      if (result.success) {
        onSuccess?.();
        return {
          success: true,
          message: "리뷰가 성공적으로 수정되었습니다!",
        };
      }

      return {
        success: false,
        message: result.error,
      };
    }

    // Create mode인 경우 addReview 호출
    const result = await addReview({
      ai_tool_id: toolId,
      rating,
      review_text: review_text.trim(),
      recommend: rating >= 4,
      used_with_tool_id: null,
    });

    if (result.success) {
      onSuccess?.();
      return {
        success: true,
        message: "리뷰가 성공적으로 등록되었습니다!",
      };
    }

    return {
      success: false,
      message: result.error,
    };
  };

  const [reviewFormState, reviewFormAction] = useActionState<
    ReviewFormState,
    FormData
  >(reviewAction, null);

  return { reviewFormState, reviewFormAction };
};
