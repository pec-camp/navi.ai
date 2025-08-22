// 리뷰 관련 인터페이스 정의

export interface Review {
  id: string;
  toolSlug: string;
  userId: string;
  author: string;
  rating: number; // 1-5 점
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified?: boolean;
  helpfulCount?: number;
  tools?: string; // 함께 사용한 도구
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface CreateReviewData {
  toolSlug: string;
  rating: number;
  content: string;
  tools?: string;
}

export interface ReviewFormData {
  rating: number;
  content: string;
  tools?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  stats: ReviewStats;
  total: number;
}