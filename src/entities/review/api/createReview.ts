import { createClient } from "@/shared/utils/supabase/client";
import { CreateReviewData, Review } from "../model/Review.interface";

/**
 * 새로운 리뷰를 생성하는 함수
 * @param reviewData 리뷰 생성 데이터
 * @returns 생성된 리뷰 정보
 */
export async function createReview(reviewData: CreateReviewData): Promise<Review | null> {
  const supabase = createClient();

  try {
    // 현재 사용자 정보 가져오기
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Error getting user:", userError);
      return null;
    }

    // Note: 실제 데이터베이스에 reviews 테이블이 없으므로 목업 응답을 반환
    // 실제 구현 시에는 아래 코드의 주석을 해제하고 사용
    
    /*
    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        tool_slug: reviewData.toolSlug,
        user_id: user.id,
        author: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous',
        rating: reviewData.rating,
        content: reviewData.content,
        tools: reviewData.tools,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_verified: false,
        helpful_count: 0
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating review:", error);
      return null;
    }

    return {
      id: review.id,
      toolSlug: review.tool_slug,
      userId: review.user_id,
      author: review.author,
      rating: review.rating,
      content: review.content,
      createdAt: new Date(review.created_at),
      updatedAt: new Date(review.updated_at),
      isVerified: review.is_verified,
      helpfulCount: review.helpful_count,
      tools: review.tools
    };
    */

    // 임시 목업 응답 (실제 DB 연결 전까지 사용)
    const mockReview: Review = {
      id: `mock-${Date.now()}`,
      toolSlug: reviewData.toolSlug,
      userId: user.id,
      author: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous',
      rating: reviewData.rating,
      content: reviewData.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      helpfulCount: 0,
      tools: reviewData.tools
    };

    // 로컬 스토리지에 임시 저장 (개발용)
    const existingReviews = localStorage.getItem(`reviews-${reviewData.toolSlug}`);
    const reviews = existingReviews ? JSON.parse(existingReviews) : [];
    reviews.unshift(mockReview);
    localStorage.setItem(`reviews-${reviewData.toolSlug}`, JSON.stringify(reviews));

    return mockReview;

  } catch (error) {
    console.error("Error in createReview:", error);
    return null;
  }
}