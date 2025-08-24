"use server";

import { 
  CreateReviewData, 
  UpdateReviewResult 
} from "@/entities/review/model/Review.interface";
import { createClient } from "@/shared/utils/supabase/server";

/**
 * 리뷰를 업데이트하는 서버 액션
 * @param reviewId 리뷰 ID
 * @param updateData 업데이트할 데이터
 * @returns 업데이트 결과
 */
export async function updateReviewAction(
  reviewId: number,
  updateData: Partial<CreateReviewData>,
): Promise<UpdateReviewResult> {
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
        error: "본인이 작성한 리뷰만 수정할 수 있습니다."
      };
    }

    const { data: review, error } = await supabase
      .from("reviews")
      .update({
        rating: updateData.rating,
        review_text: updateData.review_text,
        recommend: updateData.recommend,
        used_with_tool_id: updateData.used_with_tool_id,
      })
      .eq("id", reviewId)
      .select()
      .single();

    if (error) {
      console.error("Error updating review:", error);
      return {
        success: false,
        error: "리뷰 수정에 실패했습니다."
      };
    }

    return {
      success: true,
      data: review
    };
  } catch (error) {
    console.error("Error in updateReviewAction:", error);
    return {
      success: false,
      error: "서버 오류가 발생했습니다."
    };
  }
}