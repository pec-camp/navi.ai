import { formatReviews } from "./formatReviews";

export interface ReviewAuthor {
  id: string;
  name?: string;
  avatarUrl?: string;
  profession?: string;
}

export type Review = ReturnType<typeof formatReviews> & {
  author?: ReviewAuthor;
};

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
