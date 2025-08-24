"use server";

import { DeleteReviewResult } from "@/entities/review/model/Review.interface";
import { createClient } from "@/shared/utils/supabase/server";

/**
 * 리뷰를 삭제하는 서버 액션
 * @param reviewId 리뷰 ID
 * @returns 삭제 결과
 */
export async function removeReview(reviewId: number): Promise<DeleteReviewResult> {
  try {
    const supabase = await createClient();
    
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "로그인이 필요합니다."
      };
    }

    // 본인 리뷰인지 확인
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("user_id")
      .eq("id", reviewId)
      .single();

    if (!existingReview || existingReview.user_id !== user.id) {
      return {
        success: false,
        error: "본인이 작성한 리뷰만 삭제할 수 있습니다."
      };
    }

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      console.error("Error deleting review:", error);
      return {
        success: false,
        error: "리뷰 삭제에 실패했습니다."
      };
    }

    return {
      success: true,
      data: { deleted: true }
    };
  } catch (error) {
    console.error("Error in removeReview:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다."
    };
  }
}