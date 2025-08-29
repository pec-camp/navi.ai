// Read-only API exports (FSD: entities are read-only)
export { getReviewsByTool } from "./api";

// Model exports
export type {
  Review,
  ReviewAuthor,
  ReviewsResponse,
  ReviewStats,
} from "./model";

// Read-only UI Component exports
export { default as ReviewItem } from "./ui/ReviewItem";
