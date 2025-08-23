import { createClient } from "@/shared/utils/supabase/server";

import { ReviewsResponse, ReviewStats } from "../model/Review.interface";
import { enrichReviewWithAuthor } from "./utils/enrichReviewData";

/**
 * 특정 도구의 리뷰 목록을 가져오는 함수
 * @param toolId AI 도구 ID
 * @param limit 가져올 리뷰 개수 (기본값: 10)
 * @param offset 페이지네이션 오프셋 (기본값: 0)
 * @returns 리뷰 목록과 통계
 */
export async function getReviewsByTool(
  toolId: number,
  limit: number = 10,
  offset: number = 0
): Promise<ReviewsResponse> {
  const supabase = await createClient();

  try {
    // 1. 리뷰 데이터 조회 (사용자 정보 포함)
    const { data: reviewsData, error: reviewError, count } = await supabase
      .from("reviews")
      .select(`
        *,
        users!reviews_user_id_fkey (
          id,
          email
        )
      `, { count: "exact" })
      .eq("ai_tool_id", toolId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (reviewError) {
      console.error("Error fetching reviews:", reviewError);
      throw new Error("리뷰를 불러오는데 실패했습니다.");
    }

    // 2. 사용자 메타데이터 가져오기 (아바타, 이름 등)
    const reviews = await Promise.all(
      (reviewsData || []).map(review => enrichReviewWithAuthor(review, supabase))
    );

    // 3. 통계 데이터 계산
    const stats = await calculateReviewStats(toolId);

    return {
      reviews: reviews || [],
      stats,
      total: count || 0
    };

  } catch (error) {
    console.error("Error in getReviewsByTool:", error);
    throw error;
  }
}

/**
 * 리뷰 통계 계산
 * @param toolId AI 도구 ID
 * @returns 리뷰 통계
 */
async function calculateReviewStats(toolId: number): Promise<ReviewStats> {
  const supabase = await createClient();

  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("rating, recommend")
      .eq("ai_tool_id", toolId);

    if (error) {
      console.error("Error calculating review stats:", error);
      throw new Error("통계 계산에 실패했습니다.");
    }

    if (!reviews || reviews.length === 0) {
      return getDefaultStats();
    }

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
    
    const recommendCount = reviews.filter(review => review.recommend === true).length;
    const recommendPercentage = totalReviews > 0 ? (recommendCount / totalReviews) * 100 : 0;

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10, // 소수점 1자리
      recommendPercentage: Math.round(recommendPercentage)
    };
  } catch (error) {
    console.error("Error calculating review stats:", error);
    throw error;
  }
}

/**
 * 기본 통계 반환
 * @returns 기본 통계 값
 */
function getDefaultStats(): ReviewStats {
  return {
    totalReviews: 0,
    averageRating: 0,
    recommendPercentage: 0
  };
}