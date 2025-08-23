export interface ReviewAuthor {
  id: string;
  name?: string;
  avatar_url?: string;
  profession?: string;
}

export interface Review {
  id: number;
  ai_tool_id: number;
  user_id: string;
  rating: number;
  review_text: string;
  recommend: boolean;
  created_at: string;
  used_with_tool_id: number | null;
  // JOIN된 사용자 정보
  author?: ReviewAuthor;
}

export interface CreateReviewData {
  ai_tool_id: number;
  rating: number;
  review_text: string;
  recommend?: boolean;
  used_with_tool_id?: number | null;
}

export interface ReviewFormData {
  rating: number;
  review_text: string;
  recommend?: boolean;
  used_with_tool_id?: number | null;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  recommendPercentage: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  stats: ReviewStats;
  total: number;
}

// Server Action Response Types (mutation용)
export type ActionResult<T = unknown> = 
  | { success: true; data: T }
  | { success: false; error: string };

export type CreateReviewResult = ActionResult<Review>;
export type UpdateReviewResult = ActionResult<Review>;
export type DeleteReviewResult = ActionResult<{ deleted: boolean }>;
