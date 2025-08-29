import { Tables } from "@/src/shared/utils/supabase";

type Review = Tables<"reviews">;

export const formatReviews = (review: Review) => {
  return {
    id: review.id,
    aiToolId: review.ai_tool_id,
    userId: review.user_id,
    rating: review.rating,
    reviewText: review.review_text,
    recommend: review.recommend,
    createdAt: review.created_at,
    usedWithToolId: review.used_with_tool_id,
  };
};
