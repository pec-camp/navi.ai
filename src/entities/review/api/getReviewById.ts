import { createClient } from "@/shared/utils/supabase/server";

import { Review } from "../model/Review.interface";
import { enrichReviewWithAuthor } from "./utils/enrichReviewData";

/**
 * 특정 리뷰 조회
 * @param reviewId 리뷰 ID
 * @returns 리뷰 정보
 */
export async function getReviewById(reviewId: number): Promise<Review | null> {
  const supabase = await createClient();

  try {
    const { data: reviewData, error } = await supabase
      .from("reviews")
      .select(`
        *,
        users!reviews_user_id_fkey (
          id,
          email
        )
      `)
      .eq("id", reviewId)
      .single();

    if (error) {
      if (error.code === "PGRST116") { // No rows returned
        return null;
      }
      console.error("Error fetching review:", error);
      throw new Error("리뷰를 찾을 수 없습니다.");
    }

    // 사용자 메타데이터 추가
    const review = await enrichReviewWithAuthor(reviewData, supabase);

    return review;
  } catch (error) {
    console.error("Error in getReviewById:", error);
    throw error;
  }
}