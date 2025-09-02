"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/shared/utils/supabase/server";

import { DeleteReviewResult } from "../model/ReviewMutation.interface";

/**
 * 기존 리뷰를 삭제하는 서버 액션
 * @param reviewId 삭제할 리뷰 ID
 * @returns 삭제 결과
 */
export async function deleteReview(
  reviewId: number,
): Promise<DeleteReviewResult> {
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
        error: "삭제 권한이 없습니다.",
      };
    }

    // 리뷰 삭제
    const { error: deleteError } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId)
      .eq("user_id", user.id); // 이중 권한 검증

    if (deleteError) {
      console.error("Error deleting review:", deleteError);
      return {
        success: false,
        error: "리뷰 삭제에 실패했습니다.",
      };
    }

    // 성공시 관련 페이지 캐시 무효화
    revalidatePath("/tools");
    revalidatePath(`/tools`, "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in deleteReview:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다.",
    };
  }
}
