"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/shared/utils/supabase/server";

import { UpdateReviewResult } from "../model/ReviewMutation.interface";

/**
 * 기존 리뷰를 업데이트하는 서버 액션
 * @param reviewId 업데이트할 리뷰 ID
 * @param formData 폼 데이터 (rating, review_text)
 * @returns 업데이트 결과
 */
export async function updateReview(
  reviewId: number,
  rating: number,
  reviewText: string,
): Promise<UpdateReviewResult> {
  try {
    const supabase = await createClient();

    // 현재 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "로그인이 필요합니다.",
      };
    }

    // 기존 리뷰 조회 및 권한 검증
    const { data: existingReview, error: fetchError } = await supabase
      .from("reviews")
      .select("id, user_id, ai_tool_id")
      .eq("id", reviewId)
      .single();

    if (fetchError || !existingReview) {
      return {
        success: false,
        error: "리뷰를 찾을 수 없습니다.",
      };
    }

    // 권한 검증: 본인 리뷰인지 확인
    if (existingReview.user_id !== user.id) {
      return {
        success: false,
        error: "수정 권한이 없습니다.",
      };
    }

    // 입력 검증
    if (!rating || rating < 1 || rating > 5) {
      return {
        success: false,
        error: "올바른 별점을 선택해주세요. (1-5점)",
      };
    }

    if (!reviewText || reviewText.trim().length === 0) {
      return {
        success: false,
        error: "리뷰 내용을 입력해주세요.",
      };
    }

    if (reviewText.trim().length > 1000) {
      return {
        success: false,
        error: "리뷰는 1000자 이하로 작성해주세요.",
      };
    }

    // 리뷰 업데이트 (이중 권한 검증 포함)
    const { error: updateError } = await supabase
      .from("reviews")
      .update({
        rating,
        review_text: reviewText.trim(),
      })
      .eq("id", reviewId)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Error updating review:", updateError);
      return {
        success: false,
        error: "리뷰 업데이트에 실패했습니다.",
      };
    }

    // 성공시 관련 페이지 캐시 무효화
    revalidatePath("/tools");
    revalidatePath(`/tools`, "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in updateReview:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다.",
    };
  }
}
