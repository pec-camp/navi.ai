"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { ReviewFormState } from "@/features/auth/model/auth.interface";
import { addReview } from "@/src/features/review/api/addReview";

export const useReviewActionState = (
  toolId: number,
  onSuccess?: () => void,
) => {
  const router = useRouter();
  const reviewAction = async (
    prevState: ReviewFormState,
    formData: FormData,
  ) => {
    const rating = Number(formData.get("rating"));
    const review_text = formData.get("review_text") as string;

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

    const result = await addReview({
      ai_tool_id: toolId,
      rating,
      review_text: review_text.trim(),
      recommend: rating >= 4, // 4점 이상이면 추천으로 설정
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
