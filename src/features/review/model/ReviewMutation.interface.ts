import { Tables } from "@/src/shared/utils/supabase/supabase.types";

type Review = Tables<"reviews">;

// Server Action Response Types (mutation용)
export type ActionResult =
  | { success: true }
  | { success: false; error: string };

export type CreateReviewResult = ActionResult;
export type UpdateReviewResult = ActionResult;
export type DeleteReviewResult = ActionResult;

export type CreateReviewData = Pick<
  Review,
  "ai_tool_id" | "rating" | "review_text" | "recommend" | "used_with_tool_id"
>;
