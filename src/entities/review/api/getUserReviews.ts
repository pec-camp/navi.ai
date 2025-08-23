import { createClient } from "@/shared/utils/supabase/server";

import { Review } from "../model/Review.interface";
import { enrichReviewWithAuthor } from "./utils/enrichReviewData";

/**
 * 사용자의 리뷰 목록을 가져오는 함수
 * @param userId 사용자 ID
 * @param limit 가져올 리뷰 개수
 * @param offset 페이지네이션 오프셋
 * @returns 사용자의 리뷰 목록
 */
export async function getUserReviews(
  userId: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ reviews: Review[]; total: number }> {
  const supabase = await createClient();

  try {
    const { data: reviewsData, error, count } = await supabase
      .from("reviews")
      .select(`
        *,
        users!reviews_user_id_fkey (
          id,
          email
        )
      `, { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching user reviews:", error);
      throw new Error("사용자 리뷰를 불러오는데 실패했습니다.");
    }

    // 사용자 메타데이터 추가
    const reviews = await Promise.all(
      (reviewsData || []).map(review => enrichReviewWithAuthor(review, supabase))
    );

    return {
      reviews: reviews || [],
      total: count || 0
    };
  } catch (error) {
    console.error("Error in getUserReviews:", error);
    throw error;
  }
}

/**
 * 사용자가 특정 도구에 작성한 리뷰 확인
 * @param toolId AI 도구 ID
 * @param userId 사용자 ID
 * @returns 사용자의 리뷰 (없으면 null)
 */
export async function getUserReviewForTool(
  toolId: number,
  userId: string
): Promise<Review | null> {
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
      .eq("ai_tool_id", toolId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user review:", error);
      throw new Error("리뷰 확인에 실패했습니다.");
    }

    if (!reviewData) {
      return null;
    }

    // 사용자 메타데이터 추가
    const review = await enrichReviewWithAuthor(reviewData, supabase);

    return review;
  } catch (error) {
    console.error("Error in getUserReviewForTool:", error);
    throw error;
  }
}