import { cache } from "react";

import {
  anonymizeNickname,
  formatProfessionForDisplay,
  generateAvatarUrl,
} from "@/features/review/model/anonymizeNickname";
import { createClient } from "@/shared/utils/supabase/server";

import { ReviewsResponse, ReviewStats } from "../model/Review.interface";
import { formatReviews } from "./../model/formatReviews";

/**
 * 특정 도구의 리뷰 목록을 가져오는 함수
 * @param toolId AI 도구 ID
 * @param limit 가져올 리뷰 개수 (기본값: 10)
 * @param offset 페이지네이션 오프셋 (기본값: 0)
 * @returns 리뷰 목록과 통계
 */
export const getReviewsByTool = cache(
  async (
    toolId: number,
    limit: number = 10,
    offset: number = 0,
  ): Promise<ReviewsResponse> => {
    const supabase = await createClient();

    try {
      const [reviewsResult, statsResult] = await Promise.all([
        // 1. 리뷰 데이터 조회 (사용자 정보 포함)
        supabase
          .from("reviews")
          .select(
            `
          *,
          users!reviews_user_id_fkey (
            id,
            email,
            profession
          )
        `,
            { count: "exact" },
          )
          .eq("ai_tool_id", toolId)
          .order("created_at", { ascending: false })
          .range(offset, offset + limit - 1),

        // 2. 통계 데이터 조회 (병렬 실행)
        supabase
          .from("reviews")
          .select("rating, recommend")
          .eq("ai_tool_id", toolId),
      ]);

      const { data: reviewsData, error: reviewError, count } = reviewsResult;
      const { data: statsData, error: statsError } = statsResult;

      if (reviewError) {
        console.error("Error fetching reviews:", reviewError);
        throw new Error("리뷰를 불러오는데 실패했습니다.");
      }

      if (statsError) {
        console.error("Error fetching review stats:", statsError);
        throw new Error("통계를 불러오는데 실패했습니다.");
      }

      // 3. 리뷰 데이터 포맷팅
      const reviews = (reviewsData || []).map((review) => {
        const originalName = review.users?.email?.split("@")[0] || "Anonymous";
        const userId = review.users?.id || review.user_id || "anonymous";
        return {
          ...formatReviews(review),
          author: {
            id: userId,
            name: anonymizeNickname(originalName),
            avatarUrl: generateAvatarUrl(userId),
            profession: formatProfessionForDisplay(
              review.users?.profession || undefined,
            ),
          },
        };
      });

      // 4. 통계 계산
      const stats = calculateStatsFromData(statsData || []);

      return {
        reviews,
        stats,
        total: count || 0,
      };
    } catch (error) {
      console.error("Error in getReviewsByTool:", error);
      throw error;
    }
  },
);

/**
 * 통계 데이터로부터 통계 계산 (최적화된 버전)
 * @param statsData 통계 원시 데이터
 * @returns 리뷰 통계
 */
function calculateStatsFromData(
  statsData: Array<{ rating: number; recommend: boolean }>,
): ReviewStats {
  if (!statsData || statsData.length === 0) {
    return getDefaultStats();
  }

  const totalReviews = statsData.length;
  const totalRating = statsData.reduce(
    (sum, review) => sum + (review.rating || 0),
    0,
  );
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const recommendCount = statsData.filter(
    (review) => review.recommend === true,
  ).length;
  const recommendPercentage =
    totalReviews > 0 ? (recommendCount / totalReviews) * 100 : 0;

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10, // 소수점 1자리
    recommendPercentage: Math.round(recommendPercentage),
  };
}

/**
 * 기본 통계 반환
 * @returns 기본 통계 값
 */
function getDefaultStats(): ReviewStats {
  return {
    totalReviews: 0,
    averageRating: 0,
    recommendPercentage: 0,
  };
}
