import { createClient } from "@/shared/utils/supabase/server";
import { Review, ReviewStats, ReviewsResponse } from "../model/Review.interface";

/**
 * 특정 도구의 리뷰 목록을 가져오는 함수
 * @param toolSlug 도구 슬러그
 * @param limit 가져올 리뷰 개수 (기본값: 10)
 * @param offset 페이지네이션 오프셋 (기본값: 0)
 * @returns 리뷰 목록과 통계
 */
export async function getReviewsByTool(
  toolSlug: string,
  limit: number = 10,
  offset: number = 0
): Promise<ReviewsResponse> {
  const supabase = await createClient();

  try {
    // Note: 실제 데이터베이스에 reviews 테이블이 없으므로 목업 데이터를 반환
    // 실제 구현 시에는 아래 코드의 주석을 해제하고 사용
    
    /*
    // 1. 리뷰 데이터 조회
    const { data: reviews, error: reviewError } = await supabase
      .from("reviews")
      .select(`
        id,
        tool_slug,
        user_id,
        author,
        rating,
        content,
        created_at,
        updated_at,
        is_verified,
        helpful_count,
        tools
      `)
      .eq("tool_slug", toolSlug)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (reviewError) {
      console.error("Error fetching reviews:", reviewError);
      return { reviews: [], stats: getDefaultStats(), total: 0 };
    }

    // 2. 통계 데이터 조회
    const { data: stats, error: statsError } = await supabase
      .rpc("get_review_stats", { tool_slug: toolSlug });

    if (statsError) {
      console.error("Error fetching review stats:", statsError);
    }
    */

    // 임시 목업 데이터 (실제 DB 연결 전까지 사용)
    const mockReviews: Review[] = [
      {
        id: "1",
        toolSlug,
        userId: "user1",
        author: "김민수",
        rating: 5,
        content: "업무 효율성이 크게 향상되었습니다. 특히 문서 작성과 아이디어 발상에 매우 도움이 됩니다.",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        isVerified: true,
        helpfulCount: 12,
        tools: "Notion AI"
      },
      {
        id: "2", 
        toolSlug,
        userId: "user2",
        author: "이영희",
        rating: 4,
        content: "대부분의 질문에 정확한 답변을 제공하지만, 가끔 최신 정보가 부족할 때가 있습니다.",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
        isVerified: true,
        helpfulCount: 8
      },
      {
        id: "3",
        toolSlug,
        userId: "user3", 
        author: "박지훈",
        rating: 5,
        content: "직관적인 인터페이스와 빠른 응답 속도가 인상적입니다. 창작 작업에 매우 유용합니다.",
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-08"),
        isVerified: false,
        helpfulCount: 5,
        tools: "Figma"
      }
    ];

    const mockStats: ReviewStats = {
      totalReviews: mockReviews.length,
      averageRating: 4.7,
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 1,
        5: 2
      }
    };

    return {
      reviews: mockReviews.slice(offset, offset + limit),
      stats: mockStats,
      total: mockReviews.length
    };

  } catch (error) {
    console.error("Error in getReviewsByTool:", error);
    return { 
      reviews: [], 
      stats: getDefaultStats(), 
      total: 0 
    };
  }
}

function getDefaultStats(): ReviewStats {
  return {
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
  };
}